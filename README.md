# 🎙️ Essence Helper

[![https://img.shields.io/static/v1?label=made%20with&message=jovo&color=272f48&logo=data:https://www.jovo.tech/favicon.ico](https://img.shields.io/static/v1?label=made%20with&message=jovo&color=272f48)](https://www.jovo.tech)
[![https://img.shields.io/static/v1?label=google%20assistant&message=compatible&logo=googleassistant&color=brightgreen](https://img.shields.io/static/v1?label=google%20assistant&message=compatible&logo=googleassistant&color=brightgreen)](https://assistant.google.com/services/a/uid/0000005dbaeb2c8d?hl=en-US)
[![https://img.shields.io/static/v1?label=amazon%20alexa&message=compatible&logo=amazonalexa&color=brightgreen](https://img.shields.io/static/v1?label=amazon%20alexa&message=compatible&logo=amazonalexa&color=brightgreen)](https://www.amazon.com/dp/B09T6XJ3NT)

Essence Helper is a voice app compatible with Google Assistant and Amazon Alexa that retrieves information about ZenithVR MMORPG.

This project is made using [Jovo Framework](https://www.jovo.tech) with the goal to avoid duplicate logic and code while developing the skill for Alexa and Google Assistant.  

Before discovering this framework, I've developed the same skill for both platforms using their own SDKs:

Previous Alexa Skill repository:  
https://github.com/Markkop/essence-helper-alexa-skill  
Previous Google Action repository:  
https://github.com/Markkop/essence-helper-google-action

## Get the skill

- Google Assistant Actions:  
https://assistant.google.com/services/a/uid/0000005dbaeb2c8d?hl=en-US

- Alexa Skill Store:  
https://www.amazon.com/dp/B09T6XJ3NT

## Setup

- Install [Jovo CLI](https://www.jovo.tech/docs/cli) with `npm install -g @jovotech/cli`
- Install and setup ASK CLI following [these instructions](https://developer.amazon.com/en-US/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html).
- Install and setup Gactions CLI following [these instructions](https://developers.google.com/assistant/actionssdk/gactions)
- I suggest installing it with `npm i -g @assistant/gactions` instead of the zip file as indicated in the guide above.
- Run `npm install` in the root folder of the project

## Develop

### Locally only

- Run `jovo run`
- Press `.` to open web interface
- Interact with the app by sending requests to [Jovo Debugger](https://www.jovo.tech/docs/debugger).

### Using local code with remote console

- Run `jovo run`
- Run `npm run deploy:<platform>:dev` to set the remote webhook url to the local jovo webhook.
- Read the deploy section below for more information
- Interact with the remote console ([Google Assistant Simulator](https://developers.google.com/assistant/console/simulator) or [Alexa Simulator](https://developer.amazon.com/en-US/docs/alexa/devconsole/alexa-simulator.html))
- Or interact with your app directly using a platform device (Echot Dot/Google Nest, for example) given the satisfied requirements:
- Alexa Docs: [Test your skill on an Alexa-enabled device](https://developer.amazon.com/en-US/docs/alexa/test/test-your-skill-overview.html#alexa-device)
- Google Docs: [Google Simulator on-device](https://developers.google.com/assistant/console/simulator#on-device_testing)

## Test

### Unit Testing

To run unit tests for the jovo app itself simply run `npm run test`

### Alexa Dialog Replays

To simulate requests directly to the Alexa Skill, run `npm run test:dialog`.  
This will run `ask dialog -r replay_file.json` for each dialog replay file inside `test/alexa/dialog-replays`.  
Make sure to deploy the `dev` or `prod` endpoint according to the testing you want to make.

For replaying a single file, run `./scripts/alexa-dialogs.sh -f <filename>` as in `./scripts/alexa-dialogs.sh -f launch`, for example.

### Google Assistant Testing

To simulate requests to the Google Action, first setup a service account by following [these instructions](https://github.com/actions-on-google/actions-builder-conversation-components-nodejs/blob/master/README.md#running-tests).  
Then run `npm run enable-activity-controls` only once.  
Finally you can run `npm run test:google`
To able to run the latest draft version, the test rewrites the app preview everytime you run the test suite.  
If you want to keep running tests without changes in the action model and settings, you may skip this rewriting.  
Run `npm run test:google:norewrite` in this case.  

## Deploy

### Platform
Running `npm run deploy:<platform>:<stage>` will deploy the model and platform settings within three steps:

* It will first get files from remote console and put them in the `build` folder
* Then it will build files from Jovo Models and other custom settings adding and replacing files in `build` folder
* Finally it will deploy the files in the `build` folder to the platform console

Note: we get them first to keep some of the settings we have already set in previous builds and/or keep settings we've inputted in the console.

The difference between stage `dev` and `prod` is the endpoint we're setting for the app.  
With the `dev` endpoint, we're able to have all the requests routed to our Jovo App instance locally and therefore test our code using the platform console or device.  
Just make sure to run `jovo run` once to copy the Jovo Webhook Endpoint and save it as an `env` variable (`JOVO_WEBHOOK_URL`)

Note: the only reason to use the Jovo Webhook Endpoint from an `env` variable and not the default project setting variable is because of Alexa's regions endpoint settings that have to be set in a customized manner as coded at `jovo.project.js`. Although Alexa Console says that the NA endpoint is optional, if setting it empty the webhook won't work. 

### Code
Running `npm run deploy:code` will deploy the code to the AWS Lambda function using Jovo integration with [Serverless CLI](https://www.jovo.tech/marketplace/target-serverless) and [AWS Lambda integration](https://www.jovo.tech/marketplace/server-lambda).  
You might need to install Serverless CLI: `npm i -g serverless` and configure it  
Then you will need to export your [AWS Credentials](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html) or [configure serverless]((https://www.serverless.com/framework/docs/providers/aws/guide/credentials/)) with the following command:

```	
serverless config credentials \
  --provider aws \
  --key AKIAIOSFODNN7EXAMPLE \
  --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```