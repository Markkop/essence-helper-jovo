import { ActionsOnGoogleTestManager } from '@assistant/conversation-testing'
import { afterEachActionsOnGoogleTest, beforeAllActionsOnGoogleTests, loadProjectSettings } from './testUtils'
import { testPerk } from './perk'
import { testDiscoverable } from './discoverable'
import { testCompatibility } from './compatibility'
import { testStart } from './start'

describe('Essence Helper Test Suite', function () {
  jest.setTimeout(60000)
  const { projectId, triggerPhrase } = loadProjectSettings()
  const test = new ActionsOnGoogleTestManager({ projectId })

  beforeAll(() => beforeAllActionsOnGoogleTests(test))
  afterEach(() => afterEachActionsOnGoogleTest(test))

  describe('Start', () => testStart(test, triggerPhrase))
  describe('Compatibility', () => testCompatibility(test, triggerPhrase))
  describe('Perk intent', () => testPerk(test, triggerPhrase))
  describe('Discoverable intent', () => testDiscoverable(test, triggerPhrase))
})
