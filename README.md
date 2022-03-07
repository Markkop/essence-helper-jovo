# 🥽 Essence Helper

[![https://img.shields.io/static/v1?label=made%20with&message=jovo&color=272f48&logo=data:https://www.jovo.tech/favicon.ico](https://img.shields.io/static/v1?label=made%20with&message=jovo&color=272f48)](https://www.jovo.tech)
[![https://img.shields.io/static/v1?label=google%20assistant&message=compatible&logo=googleassistant&color=brightgreen](https://img.shields.io/static/v1?label=google%20assistant&message=compatible&logo=googleassistant&color=brightgreen)](https://www.jovo.tech)
[![https://img.shields.io/static/v1?label=amazon%20alexa&message=compatible&logo=amazonalexa&color=brightgreen](https://img.shields.io/static/v1?label=amazon%20alexa&message=compatible&logo=amazonalexa&color=brightgreen)](https://www.jovo.tech)

Essence Helper is a voice app compatible with Google Assistant and Amazon Alexa that retrieves information about ZenithVR MMORPG.

This project is made using Jovo as an effort to avoid duplicate logic and code.

## Get the skill

- Soon

## Setup

- Follow Jovo Cli instructions
- Configure ASK Cli
- Configure Gactions CLI

## Develop

- Install [Jovo CLI](https://www.jovo.tech/docs/cli)
- Run `npm install`
- Run `jovo run`
- Press `.` to open web interface

## Test

### Unit Testing

To run unit tests simply run `npm run test`

### Alexa Dialog Replays

To simulate requests directly to the Alexa Skill, run `npm run test:dialog`.  
This will run `ask dialog -r replay_file.json` for each dialog replay file inside `test/alexa/dialog-replays`.
Make sure to deploy the `dev` or `prod` endpoint according to the testing you want to make.

## Deploy

### Platform:
Running `npm run deploy:<platform>:<stage>` will deploy the model and platform settings using three subcommands:

* It will first get files from remote console and put them in the `build` folder
* Then it will build files from Jovo Models and other custom settings and replace some of the files in `build` folder
* Finally it will deploy the files in the `build` folder to the platform console

Note: we get them first to keep some of the settings we have already set in previous builds and/or keep settings we've inputted in the console.

The difference between stage `dev` and `prod` is the endpoint we're setting for the app.  
With the `dev` endpoint, we're able to have all the requests routed to our Jovo App instance locally and therefore test our code using the platform console or device.
Just make sure to run `jovo run` once to copy the Jovo Webhook Endpoint and save it as an `env` variable (`JOVO_WEBHOOK_URL`)

Note: the only reason to use the Jovo Webhook Endpoint from an `env` variable and not the default project setting variable is because of Alexa's regions endpoint settings that have to be set in a customized manner as coded at `jovo.project.js`. Although Alexa Console says that the NA endpoint is optional, if setting it empty the webhook won't work. 

### Code
Running `npm run deploy:code` will deploy the code to the AWS Lambda function using Jovo integration with Serverless CLI.
You might need to install Serverless CLI: `npm i -g serverless` and configure it
Then you will need to export your AWS Credentials or configure serverless with the following command:

```	
serverless config credentials \
  --provider aws \
  --key AKIAIOSFODNN7EXAMPLE \
  --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

More information:
- [Jovo Serverless CLI Integration](https://www.jovo.tech/marketplace/target-serverless)
- [Serveless AWS Credentials guide](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/)


