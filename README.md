# GitHub Actions for reading secrets from Cerberus

[Cerberus](https://engineering.nike.com/cerberus/) is an Open Source Secrets Management tool. Users would like to read secrets that are stored in Cerberus and use them in their GitHub actions steps/jobs.

This GitHub Actions provides functionality to read secrets from Cerberus and make it as environment variables in GitHub Actions job so that it can be used in workflow. This helps users to hold their application secrets in Cerberus and use them same as they would use GitHub secrets.

To learn more about Cerberus, please visit the [Cerberus website](http://engineering.nike.com/cerberus/).

Secrets will be available as environment variables. These environment values would be masked (with \*\*\*) when displayed in console log. Secrets never be revealed.

# Action Inputs and Environment Values

| Parameter               | Description                                                                                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `cerberusUrl`           | Required. Cerberus server URL from where secrets should be read. Example: 'https://prod.cerberus.example.com'                                                                                                            |
| `sdbPath`               | Required. Path to the safe deposit box. Example: 'app/myapplication/database'                                                                                                                                            |
| `sdbEnvVariableMapping` | Required. Json string representing the key name in cerberus and the corresponding environment variable name where the secret should be made available. Example: '{"username": "DB_USERNAME", "password": "DB_PASSWORD"}' |
| `cerberusRegion`        | Optional. AWS Region to use for authentication. Action will use AWS Metadata URL to fetch the runner's region. When not available or error fetching, region is default to `us-east-1`. Example: 'us-west-2'              |

**Note:** `CERBERUS_TOKEN` environment variable can be used to override normal authentication with cerberus.

# Usage

Usage for this action in workflow.

```yaml
steps:
  - name: Read secrets from Cerberus to ENV
    uses: Nike-Inc/actions-cerberus-secrets
    with:
      cerberusUrl: 'https://prod.cerberus.example.com'
      cerberusRegion: 'us-west-2'
      sdbPath: 'app/myapplication/database'
      sdbEnvVariableMapping: '{"username": "DB_USERNAME", "password": "DB_PASSWORD"}'
  - name: Demonstrate use of Cerberus secrets
    run: 'mydbscript.bash $DB_USERNAME $DB_PASSWORD'
```

# AWS IAM Role

Users need AWS IAM Role with required access permissions to communicate with Cerberus. It is greatly recommend to use IAM Role from the runner for this purpose.
Please refer [Cerberus User Guide](https://engineering.nike.com/cerberus/docs/) for more information.

# Example workflows

A working example of [using IAM Role associated with runner](./.github/workflows/example-iam.yaml) and [using Cerberus Token](./.github/workflows/example-token.yaml) are available in workflows of this repository.

# Development environment

This Actions is using [Cerberus Node Client](https://github.com/Nike-Inc/cerberus-node-client) for interacting with a Cerberus backend.

Install the dependencies

```bash
$ npm install
```

Build the typescript and package it for distribution

```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:

```bash
$ npm test
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder.

Then run [ncc](https://github.com/zeit/ncc) and push the results:

```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:
