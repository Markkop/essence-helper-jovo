import { InputType, TestSuite } from '@jovotech/framework'
import { AlexaPlatform } from '@jovotech/platform-alexa'
import { GoogleAssistantPlatform } from '@jovotech/platform-googleassistant'
import { expectedAskForPerkOutput, expectedGodkingPassionPerkOutput, expectedShellPerkOutput } from './expected'
import { expectOutputToEqual } from './testUtils'

export function testPerkIntent(testSuite: TestSuite<GoogleAssistantPlatform | AlexaPlatform>) {
  test('get perk effect by launching the app, triggering perk intent and providing a perk entity', async () => {
    await testSuite.run({ type: InputType.Launch })

    const { output: askForPerk } = await testSuite.run({ intent: 'GetEquipmentPerkIntent' })
    expectOutputToEqual(askForPerk, expectedAskForPerkOutput)

    const { output: perkOutput } = await testSuite.run({ entities: { perk: { resolved: 'Shell' } } })
    expectOutputToEqual(perkOutput, expectedShellPerkOutput)
  })

  test('get perk effect by launching the app and providing a perk entity directly', async () => {
    await testSuite.run({ type: InputType.Launch })

    const { output: perkOutput } = await testSuite.run({ entities: { perk: { resolved: 'Shell' } } })
    expectOutputToEqual(perkOutput, expectedShellPerkOutput)
  })

  test('get perk effect by launching the app while triggering perk intent with a perk entity', async () => {
    const { output: perkOutput } = await testSuite.run({
      intent: 'GetEquipmentPerkIntent',
      entities: { perk: { resolved: 'Shell' } },
    })

    expectOutputToEqual(perkOutput, expectedShellPerkOutput)
  })

  test('get a parsed perk effect', async () => {
    const { output: perkOutput } = await testSuite.run({
      intent: 'GetEquipmentPerkIntent',
      entities: { perk: { resolved: "Godking's Passion" } },
    })

    expectOutputToEqual(perkOutput, expectedGodkingPassionPerkOutput)
  })
}
