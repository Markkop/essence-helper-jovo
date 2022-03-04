import { Component, BaseComponent, Intents } from '@jovotech/framework'

import { YesNoOutput } from '../output/YesNoOutput'

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| A component consists of handlers that respond to specific user requests
| Learn more here: www.jovo.tech/docs/components, jovo.tech/docs/handlers
|
*/
@Component()
export class LoveHatePizzaComponent extends BaseComponent {
  START(): Promise<void> {
    return this.$send(YesNoOutput, { message: 'Do you like pizza?' })
  }

  @Intents(['YesIntent'])
  lovesPizza(): Promise<void> {
    return this.$send({ message: 'Yes! I love pizza, too.', listen: false })
  }

  @Intents(['NoIntent'])
  hatesPizza(): Promise<void> {
    return this.$send({ message: `That's OK! Not everyone likes pizza.`, listen: false })
  }

  UNHANDLED(): Promise<void> {
    return this.START()
  }
}
