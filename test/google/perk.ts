import { ActionsOnGoogleTestManager } from '@assistant/conversation-testing'
import { startConversation } from './testUtils'
import { en } from '../../src/utilities/strings'

const intentTrigger = 'Equipment Perk'

export function testPerk(test: ActionsOnGoogleTestManager, triggerPhrase: string) {
  it('retrieves perk effect by triggering intent from Start scene', async function () {
    await startConversation(test, triggerPhrase)
    await test.sendQuery(intentTrigger)
    test.assertSpeech(en.translation.ASK_FOR_PERK)
    await test.sendQuery('Shell')
    test.assertText('shell|Shell', { isRegexp: true })
    test.assertConversationEnded()
  })

  it('retrieves perk effect from global intent', async function () {
    await startConversation(test, triggerPhrase)
    await test.sendQuery('shell')
    test.assertText('shell|Shell', { isRegexp: true })
    test.assertConversationEnded()
  })

  it('retrieves perk effect from Start scene after slot input retry', async function () {
    await startConversation(test, triggerPhrase)
    await test.sendQuery(intentTrigger)
    test.assertSpeech(en.translation.ASK_FOR_PERK)
    await test.sendQuery('asdasdasd')
    test.assertSpeech(en.translation.PERK_NOT_FOUND)
    await test.sendQuery('shell')
    test.assertText('shell|Shell', { isRegexp: true })
    test.assertConversationEnded()
  })

  it('exits session after failing to get slot input', async function () {
    await startConversation(test, triggerPhrase)
    await test.sendQuery(intentTrigger)
    test.assertSpeech(en.translation.ASK_FOR_PERK)
    await test.sendQuery('asdasdasd')
    test.assertSpeech(en.translation.PERK_NOT_FOUND)
    await test.sendQuery('asdasdasd')
    test.assertSpeech(en.translation.PERK_NOT_FOUND)
    await test.sendQuery('asdasdasd')
    test.assertConversationEnded()
  })
}
