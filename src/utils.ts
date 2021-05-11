/*
 * Copyright 2020-present, Nike, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */

import * as core from '@actions/core'
import * as exec from '@actions/exec'

export async function getRunnerRegion(defaultRegion = ''): Promise<string> {
  const METADATA_GET_REGION_COMMAND =
    'curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone'

  let commandOutput = ''
  let commandError = ''

  const options = {
    silent: true,
    listeners: {
      stdout: (data: Buffer) => {
        commandOutput += data.toString()
      },
      stderr: (data: Buffer) => {
        commandError += data.toString()
      }
    }
  }

  core.info(`Fetching region from Runner`)
  core.debug(`Running command to fetch region: ${METADATA_GET_REGION_COMMAND}`)
  try {
    await exec.exec(METADATA_GET_REGION_COMMAND, undefined, options)
    core.debug(`Command Output: ${commandOutput}`)
  } catch (ex) {
    core.debug(`Exception occurred. ${ex.message}`)
    core.info(
      `Failed to fetch region information from Runner. Defaulting to given region: ${defaultRegion}`
    )
    if (commandError) {
      core.debug(`Error: ${commandError}`)
    }
  }

  const region = commandOutput ? commandOutput.slice(0, -1) : defaultRegion
  core.info(`Runner Region: ${region}`)
  return region
}
