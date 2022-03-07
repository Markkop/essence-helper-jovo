import { ActionsOnGoogleTestManager } from '@assistant/conversation-testing'
import { startConversation } from './testUtils'

export function testCompatibility(test: ActionsOnGoogleTestManager, triggerPhrase: string) {
  it('works on Smart Display devices', async () => {
    test.setTestSurface('SMART_DISPLAY')
    await startConversation(test, triggerPhrase)
    await test.sendStop()
    test.assertConversationEnded()
  })
}
