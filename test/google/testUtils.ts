/* eslint-disable max-len */
import { ActionsOnGoogleTestManager } from '@assistant/conversation-testing'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { en } from '../../src/utilities/strings'

const DEFAULT_LOCALE = 'en-US'
const DEFAULT_SURFACE = 'SMART_DISPLAY' // Should be PHONE, but: https://github.com/actions-on-google/assistant-conversation-testing-nodejs/issues/6

export async function startConversation(test: ActionsOnGoogleTestManager, triggerPhrase: string) {
  await test.sendQuery(triggerPhrase)
  test.assertSpeech(en.translation.LAUNCH)
  test.assertText(en.translation.LAUNCH)
  test.assertIntent('actions.intent.MAIN')
  test.assertScene('actions.scene.START_CONVERSATION')
}

export function loadProjectSettings(): Record<string, string> {
  try {
    const fileContents = readFileSync(
      resolve(__dirname, '../../build/prod/platform.googleAssistant/settings/settings.yaml'),
      'utf8',
    )
    const data = load(fileContents)
    const projectId = data.projectId as string
    const triggerPhrase = `Talk to ${data.localizedSettings.displayName}`
    return { projectId, triggerPhrase }
  } catch (e) {
    console.log(e)
    return {}
  }
}

export async function beforeAllActionsOnGoogleTests(test: ActionsOnGoogleTestManager) {
  await test.writePreviewFromDraft()
  test.setSuiteLocale(DEFAULT_LOCALE)
  test.setSuiteSurface(DEFAULT_SURFACE)
}

export function afterEachActionsOnGoogleTest(test: ActionsOnGoogleTestManager) {
  test.cleanUpAfterTest()
}
