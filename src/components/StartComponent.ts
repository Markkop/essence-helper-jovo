import { Component, BaseComponent, Intents } from '@jovotech/framework'
import { ChooseInformationOutput } from '../output/ChooseInformationOutput'
import { GetEquipmentPerkComponent } from './GetEquipmentPerkComponent'

@Component()
export class StartComponent extends BaseComponent {
  START(): Promise<void> {
    return this.$send(ChooseInformationOutput, {
      message:
        'Hello Zenithian. I can get you the effects of an equipment perk or the location of a cooking ingredient. Which one would you like to know?',
    })
  }

  @Intents(['GetEquipmentPerkIntent'])
  perk(): Promise<void> {
    return this.$redirect(GetEquipmentPerkComponent)
  }

  UNHANDLED(): Promise<void> {
    return this.START()
  }
}
