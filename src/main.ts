/*
 * Copyright 2020-present, Nike, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */

import * as core from '@actions/core'
import Cerberus from './cerberus'

async function run(): Promise<void> {
  try {
    core.debug('Gathering all inputs')
    const cerberusUrl: string = core.getInput('cerberusUrl')
    const cerberusRegion: string = core.getInput('cerberusRegion')
    const sdbPath: string = core.getInput('sdbPath')
    const sdbKeynameVariableMap: string = core.getInput('sdbKeynameVariableMap')

    core.info(`Using Cerberus : ${cerberusUrl} in Region ${cerberusRegion}`)
    core.info(`Reading SDB : ${sdbPath}`)
    core.info(`Looking for ${sdbKeynameVariableMap}`)

    core.debug('Converting given sdbKeynameVariableMap to JSON object')
    const mapKeyVariable = JSON.parse(sdbKeynameVariableMap)

    const cerberus = new Cerberus(cerberusUrl, cerberusRegion, true)
    cerberus.readToEnv(sdbPath, mapKeyVariable)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
