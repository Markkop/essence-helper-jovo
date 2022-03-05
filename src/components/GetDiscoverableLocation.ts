import { Component, BaseComponent } from '@jovotech/framework'
import { CardOutput } from '../output/CardOutput'
import { getDiscoverable, getDiscoverableText } from '../utilities/discoverable'
import { Strings } from '../utilities/strings'

@Component()
export class GetDiscoverableLocationComponent extends BaseComponent {
  START(): Promise<void> {
    const providedDiscoverable = this.$entities.discoverable
    if (!providedDiscoverable) {
      return this.$send({
        message: this.$t(Strings.ASK_FOR_DISCOVERABLE),
        listen: true,
      })
    }

    const providedDiscoverableName = this.$entities.discoverable!.resolved!
    const discoverable = getDiscoverable(providedDiscoverableName)
    if (!discoverable) {
      const discoverableNotFoundSpeakOutput = this.$t(Strings.DISCOVERABLE_NOT_FOUND)
      return this.$send(CardOutput, {
        speakOutput: discoverableNotFoundSpeakOutput,
        cardTitle: 'Not found',
      })
    }

    const discoverableName = discoverable.title
    if (!discoverable.additionalText && !discoverable.sources?.length) {
      const unknownLocationSpeakOutput = this.$t(Strings.UNKNOWN_LOCATION)
      return this.$send(CardOutput, {
        speakOutput: unknownLocationSpeakOutput,
        cardTitle: discoverableName,
      })
    }

    const discoverableText = getDiscoverableText(discoverable)
    const accordingToSource = this.$t(Strings.ACCORDING_TO_SOURCE, { source: 'ZenithMMO Fandom Wiki' })
    const effectSpeakOutput = this.$t(Strings.SOURCE, { sourceText: discoverableText })
    const speakOutput = `${accordingToSource}, ${effectSpeakOutput}`
    return this.$send(CardOutput, {
      speakOutput: speakOutput,
      cardTitle: discoverableName,
    })
  }

  UNHANDLED(): Promise<void> {
    return this.START()
  }
}
