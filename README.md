# GitHub Actions for reading secrets from Cerberus
This GitHub Action helps users to define secrets that stored in [Cerberus](https://engineering.nike.com/cerberus/) to environment variables.

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
   sdbKeynameVariableMap: '{"username": "DB_USERNAME", "password": "DB_PASSWORD"}'
- name: Demonstrate use of Cerberus secrets
  run: 'mydbscript.bash $DB_USERNAME $DB_PASSWORD'
```
Please note that `sdbKeynameVariableMap` is a JSON represented as string. 

# AWS IAM Role
Users need AWS IAM Role with required access permissions to communicate with Cerberus. It is greatly recommend to use IAM Role from the runner for this purpose.
Please refer [Cerberus User Guide](https://engineering.nike.com/cerberus/docs/) for more information.

# Action Inputs and Environment Values
`cerberusUrl` : Required. Cerberus server URL from where secrets should be read. Example: 'https://prod.cerberus.example.com'  
`cerberusRegion` : Required. AWS Region to use or where Cerberus is hosted. Example: 'us-west-2'  
`sdbPath` : Required. Path to the safe deposit box. Example: 'app/myapplication/database'  
`sdbKeynameVariableMap` : Required. Json string representing the key name in cerberus and the corresponding environment variable name where the secret should be made available. Example: '{"username": "DB_USERNAME", "password": "DB_PASSWORD"}'  

Secrets will be in environment values. And these environment values are masked with ***. So never be revealed.
## Development environment

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
