/*
 * Copyright 2020-present, Nike, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable github/array-foreach */
/* eslint-disable github/no-then */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as core from '@actions/core'
import CerberusClient from 'cerberus-node-client'

export default class Cerberus {
  client: CerberusClient

  constructor(hostUrl: string, region: string, debug: boolean) {
    core.debug('Creating Cerberus object and connecting to cerberus')
    this.client = new CerberusClient({
      hostUrl,
      region,
      debug
    })
  }

  readToEnv(sdbPath: string, mapKeyVariable: any) {
    core.debug(`Reading sdb ${sdbPath}`)
    this.client
      .getSecureData(sdbPath)
      .then(secrets => {
        core.debug(`Received secrets in sdb ${sdbPath}`)
        Object.keys(mapKeyVariable).forEach(requestedKeyname => {
          core.debug(`Looking for ${requestedKeyname}`)
          if (secrets[requestedKeyname]) {
            core.debug(`Found ${requestedKeyname}`)
            core.setSecret(secrets[requestedKeyname])
            core.exportVariable(
              mapKeyVariable[requestedKeyname],
              secrets[requestedKeyname]
            )
          } else {
            core.warning(
              `Key ${requestedKeyname} NOT FOUND. Not setting into environment`
            )
          }
        })
      })
      .catch(ex => {
        core.setFailed(ex.message)
      })
  }
}
