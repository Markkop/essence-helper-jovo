import { ActionsOnGoogleTestManager } from '@assistant/conversation-testing'
import { startConversation } from './testUtils'
import { en } from '../../src/utilities/strings'

export function testStart(test: ActionsOnGoogleTestManager, triggerPhrase: string) {
  it('outputs help message when receiving an unkown intent', async function () {
    await startConversation(test, triggerPhrase)
    await test.sendQuery('take me to the moon')
    test.assertSpeech(en.translation.FALLBACK_WITH_HELP)
    test.assertConversationNotEnded()
  })

  it('get an intent after not understanding for the first time', async function () {
    await startConversation(test, triggerPhrase)
    await test.sendQuery('take me to the moon')
    test.assertSpeech(en.translation.FALLBACK_WITH_HELP)
    await test.sendQuery('equipment perk')
    test.assertSpeech(en.translation.ASK_FOR_PERK)
    test.assertConversationNotEnded()
  })
}
