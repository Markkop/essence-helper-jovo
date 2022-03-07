const { GoogleAssistantCli } = require('@jovotech/platform-googleassistant')
const { AlexaCli } = require('@jovotech/platform-alexa')
const { ProjectConfig } = require('@jovotech/cli-core')
const { ServerlessCli } = require('@jovotech/target-serverless')
const { load } = require('js-yaml')
const { readFileSync, existsSync } = require('fs')

const platformSettings = {
  google: {
    path: 'settings/settings.yaml',
    buildPath: 'build/{stage}/platform.googleAssistant/settings/settings.yaml',
    loader: load,
  },
  alexa: {
    path: 'skill-package/skill.json',
    buildPath: 'build/{stage}/platform.alexa/skill-package/skill.json',
    loader: JSON.parse,
  },
}

function getAlexaEndpoints(stage) {
  const isDev = stage === 'dev'
  const endpoint = {
    uri: isDev ? process.env.JOVO_WEBHOOK_URL : process.env.ARN_ENDPOINT_PROD,
    sslCertificateType: isDev ? 'Wildcard' : undefined,
  }

  return {
    endpoint,
    regions: ['NA', 'EU'].reduce((regions, region) => {
      regions[region] = { endpoint }
      return regions
    }, {}),
  }
}

function getPlatformSettingsFiles(platform, stage) {
  const settings = platformSettings[platform]
  if (!settings) return undefined

  const path = settings.buildPath.replace('{stage}', stage)
  if (!existsSync(path)) return undefined

  const settingsFileContent = settings.loader(readFileSync(path, 'utf8'))

  if (platform === 'alexa') {
    settingsFileContent.manifest.apis.custom = getAlexaEndpoints(stage)
  }

  return {
    [settings.path]: settingsFileContent,
  }
}

function getPluginsByStage(stage) {
  return [
    new GoogleAssistantCli({
      projectId: process.env.GOOGLE_PROJECT_ID,
      files: getPlatformSettingsFiles('google', stage),
    }),
    new AlexaCli({
      locales: { en: ['en-AU', 'en-CA', 'en-IN', 'en-GB', 'en-US'] },
      skillId: process.env.ALEXA_SKILL_ID,
      files: getPlatformSettingsFiles('alexa', stage),
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
  ]
}

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
      plugins: getPluginsByStage('dev'),
    },
    prod: {
      endpoint: process.env.ENDPOINT_PROD,
      plugins: getPluginsByStage('prod'),
    },
  },
})

console.log(project.stages.dev.files)

module.exports = project
