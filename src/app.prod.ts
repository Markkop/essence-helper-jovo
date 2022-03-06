import { app } from './app'
import { handler } from './server.lambda'

/*
|--------------------------------------------------------------------------
| STAGE CONFIGURATION
|--------------------------------------------------------------------------
|
| This configuration gets merged into the default app config
| Learn more here: www.jovo.tech/docs/staging
|
*/
app.configure({
  plugins: [
    // Add Jovo plugins here
  ],
})

module.exports = { handler }
