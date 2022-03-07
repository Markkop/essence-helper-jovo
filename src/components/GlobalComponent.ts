import { Component, BaseComponent, Global, Intents } from '@jovotech/framework'
import { GetDiscoverableLocationComponent } from './GetDiscoverableLocation'
import { GetEquipmentPerkComponent } from './GetEquipmentPerkComponent'
import { StartComponent } from './StartComponent'

/*
|--------------------------------------------------------------------------
| Global Component
|--------------------------------------------------------------------------
|
| The global component handlers can be reached from anywhere in the app
| Learn more here: www.jovo.tech/docs/components#global-components
|
*/
@Global()
@Component()
export class GlobalComponent extends BaseComponent {
  LAUNCH(): Promise<void> {
    return this.$redirect(StartComponent)
  }

  @Intents(['GetEquipmentPerkIntent'])
  perk(): Promise<void> {
    return this.$redirect(GetEquipmentPerkComponent)
  }

  @Intents(['GetDiscoverableLocationIntent'])
  discoverable(): Promise<void> {
    return this.$redirect(GetDiscoverableLocationComponent)
  }
}
