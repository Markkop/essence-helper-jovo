const { GoogleAssistantCli } = require('@jovotech/platform-googleassistant')
const { AlexaCli } = require('@jovotech/platform-alexa')
const { ProjectConfig } = require('@jovotech/cli-core')
const { ServerlessCli } = require('@jovotech/target-serverless')
const alexaSkillManifest = require('./build/prod/platform.alexa/skill-package/skill.json')

/*
|--------------------------------------------------------------------------
| JOVO PROJECT CONFIGURATION
|--------------------------------------------------------------------------
|
| Information used by the Jovo CLI to build and deploy projects
| Learn more here: www.jovo.tech/docs/project-config
|
*/
const project = new ProjectConfig({
  defaultStage: 'dev',
  stages: {
    dev: {
      endpoint: '${JOVO_WEBHOOK_URL}',
    },
    prod: {
      endpoint: process.env.ENDPOINT_PROD,
    },
  },
  plugins: [
    new GoogleAssistantCli({
      projectId: 'essence-helper',
    }),
    new AlexaCli({
      locales: { en: ['en-AU', 'en-CA', 'en-IN', 'en-GB', 'en-US'] },
      skillId: process.env.SKILL_ID,
      files: {
        'skill-package/skill.json': alexaSkillManifest, // Run "jovo get:platform alexa" before building
      },
    }),
    new ServerlessCli({
      org: 'markkop',
      app: 'my-jovo-serverless-app',
      console: true,
      service: 'my-jovo-serverless-app',
      frameworkVersion: '3.7.1',
      package: {
        artifact: './bundle.zip',
      },
      provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
      },
      functions: {
        handler: {
          handler: 'index.handler',
        },
      },
    }),
  ],
})

module.exports = project
