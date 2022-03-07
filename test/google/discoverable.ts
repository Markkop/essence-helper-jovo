import { ActionsOnGoogleTestManager } from '@assistant/conversation-testing'
import { startConversation } from './testUtils'
import { en } from '../../src/utilities/strings'

const intentTrigger = 'Cooking ingredient'

export function testDiscoverable(test: ActionsOnGoogleTestManager, triggerPhrase: string) {
  it('retrieves cooking item location from Start scene', async function () {
    await startConversation(test, triggerPhrase)
    await test.sendQuery(intentTrigger)
    test.assertSpeech(en.translation.ASK_FOR_DISCOVERABLE)
    await test.sendQuery('apples')
    test.assertText('apple|Apple', { isRegexp: true })
    test.assertConversationEnded()
  })

  it('retrieves cooking item location from global intent', async function () {
    await startConversation(test, triggerPhrase)
    await test.sendQuery('apples')
    test.assertText('apple|Apple', { isRegexp: true })
    test.assertConversationEnded()
  })

  it('retrieves cooking item location from Start scene after slot input retry', async function () {
    await startConversation(test, triggerPhrase)
    await test.sendQuery(intentTrigger)
    test.assertSpeech(en.translation.ASK_FOR_DISCOVERABLE)
    await test.sendQuery('asdasdasd')
    test.assertSpeech(en.translation.DISCOVERABLE_NOT_FOUND)
    await test.sendQuery('apples')
    test.assertText('apple|Apple', { isRegexp: true })
    test.assertConversationEnded()
  })

  it('exits session after failing to get slot input', async function () {
    await startConversation(test, triggerPhrase)
    await test.sendQuery(intentTrigger)
    test.assertSpeech(en.translation.ASK_FOR_DISCOVERABLE)
    await test.sendQuery('asdasdasd')
    test.assertSpeech(en.translation.DISCOVERABLE_NOT_FOUND)
    await test.sendQuery('asdasdasd')
    test.assertSpeech(en.translation.DISCOVERABLE_NOT_FOUND)
    await test.sendQuery('asdasdasd')
    test.assertConversationEnded()
  })
}
