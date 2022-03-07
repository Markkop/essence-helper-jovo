import { Component, BaseComponent, Intents } from '@jovotech/framework'
import { ChooseInformationOutput } from '../output/ChooseInformationOutput'
import { FallbackWithHelpOutput } from '../output/FallbackWithHelp'
import { Strings } from '../utilities/strings'
import { GetDiscoverableLocationComponent } from './GetDiscoverableLocation'
import { GetEquipmentPerkComponent } from './GetEquipmentPerkComponent'

@Component()
export class StartComponent extends BaseComponent {
  START(): Promise<void> {
    return this.$send(ChooseInformationOutput, {
      message: this.$t(Strings.LAUNCH),
    })
  }

  @Intents(['GetEquipmentPerkIntent'])
  perk(): Promise<void> {
    return this.$redirect(GetEquipmentPerkComponent)
  }

  @Intents(['GetDiscoverableLocationIntent'])
  discoverable(): Promise<void> {
    return this.$redirect(GetDiscoverableLocationComponent)
  }

  UNHANDLED(): Promise<void> {
    // TO DO: Figure out how to use Get...Intent with direct slot filling in this Start component
    // without the need of doing it in this UNHANDLED method
    if (this.$entities.perk) {
      return this.$redirect(GetEquipmentPerkComponent)
    }

    if (this.$entities.discoverable) {
      return this.$redirect(GetDiscoverableLocationComponent)
    }

    return this.$send(FallbackWithHelpOutput)
  }
}
