const { GoogleAssistantCli } = require('@jovotech/platform-googleassistant')
const { AlexaCli } = require('@jovotech/platform-alexa')
const { ProjectConfig } = require('@jovotech/cli-core')
const { privacyAndCompliance, publishingInformation } = require('./alexa/manifest')

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
  endpoint: '${JOVO_WEBHOOK_URL}',
  plugins: [
    // Add Jovo CLI plugins here
    new GoogleAssistantCli({
      projectId: 'essence-helper',
    }),
    new AlexaCli({
      locales: { en: ['en-AU', 'en-CA', 'en-IN', 'en-GB', 'en-US'] },
      files: {
        'skill-package/skill.json': {
          manifest: {
            publishingInformation,
            privacyAndCompliance,
          },
        },
      },
    }),
  ],
})

module.exports = project
