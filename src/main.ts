/*
 * Copyright 2020-present, Nike, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable i18n-text/no-en */

import * as core from '@actions/core'
import Cerberus from './cerberus'
import {getRunnerRegion} from './utils'

async function run(): Promise<void> {
  try {
    core.debug('Gathering all inputs')
    const cerberusUrl: string = core.getInput('cerberusUrl')
    const cerberusUserInputRegion: string = core.getInput('cerberusRegion')
    const sdbPath: string = core.getInput('sdbPath')
    const sdbEnvVariableMapping: string = core.getInput('sdbEnvVariableMapping')

    const cerberusRegion = cerberusUserInputRegion
      ? cerberusUserInputRegion
      : await getRunnerRegion('us-east-1')

    core.info(`Using Cerberus : ${cerberusUrl} in Region ${cerberusRegion}`)
    core.info(`Reading SDB : ${sdbPath}`)
    core.info(`Looking for ${sdbEnvVariableMapping}`)

    core.debug('Converting given sdbEnvVariableMapping to JSON object')
    const mapKeyVariable = JSON.parse(sdbEnvVariableMapping)

    const cerberus = new Cerberus(cerberusUrl, cerberusRegion, true)
    cerberus.readToEnv(sdbPath, mapKeyVariable)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
