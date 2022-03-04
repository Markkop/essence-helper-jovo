import { GoogleAssistantPlatform } from '@jovotech/platform-googleassistant'
import { AlexaPlatform } from '@jovotech/platform-alexa'
import { App } from '@jovotech/framework'

import { GlobalComponent } from './components/GlobalComponent'
import { en } from './utilities/strings'
import { StartComponent } from './components/StartComponent'
import { GetEquipmentPerkComponent } from './components/GetEquipmentPerkComponent'

/*
|--------------------------------------------------------------------------
| APP CONFIGURATION
|--------------------------------------------------------------------------
|
| All relevant components, plugins, and configurations for your Jovo app
| Learn more here: www.jovo.tech/docs/app-config
|
*/
const app = new App({
  /*
  |--------------------------------------------------------------------------
  | Components
  |--------------------------------------------------------------------------
  |
  | Components contain the Jovo app logic
  | Learn more here: www.jovo.tech/docs/components
  |
  */
  components: [GlobalComponent, StartComponent, GetEquipmentPerkComponent],

  /*
  |--------------------------------------------------------------------------
  | Plugins
  |--------------------------------------------------------------------------
  |
  | Includes platforms, database integrations, third-party plugins, and more
  | Learn more here: www.jovo.tech/marketplace
  |
  */
  plugins: [
    // Add Jovo plugins here
    new GoogleAssistantPlatform(),
    new AlexaPlatform({
      intentMap: { 'AMAZON.StopIntent': 'END', 'AMAZON.CancelIntent': 'END' },
    }),
  ],

  /*
  |--------------------------------------------------------------------------
  | Other options
  |--------------------------------------------------------------------------
  |
  | Includes all other configuration options like logging
  | Learn more here: www.jovo.tech/docs/app-config
  |
  */
  logging: true,

  i18n: {
    fallbackLng: 'en-US',
    returnObjects: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en,
    },
  },
})

export { app }
