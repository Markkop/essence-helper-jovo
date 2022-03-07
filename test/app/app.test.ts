import { TestSuite } from '@jovotech/framework'
import { AlexaPlatform } from '@jovotech/platform-alexa'
import { GoogleAssistantPlatform } from '@jovotech/platform-googleassistant'
import { testPerkIntent } from './perk.test'

/*
|--------------------------------------------------------------------------
| UNIT TESTING
|--------------------------------------------------------------------------
|
| Run `npm test` to execute this sample test.
| Learn more here: www.jovo.tech/docs/unit-testing
|
*/
describe('App', () => {
  for (const Platform of [GoogleAssistantPlatform, AlexaPlatform]) {
    describe(Platform.name, () => {
      const testSuite = new TestSuite({
        // @ts-expect-error platform type error
        platform: Platform,
        stage: 'prod',
      })

      describe('Perk intent', () => testPerkIntent(testSuite))
    })
  }
})
