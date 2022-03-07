import { Component, BaseComponent } from '@jovotech/framework'
import { CardOutput } from '../output/CardOutput'
import { getIndefiniteArticleForPerkType, getPerk } from '../utilities/perk'
import { Strings } from '../utilities/strings'

@Component()
export class GetEquipmentPerkComponent extends BaseComponent {
  START(): Promise<void> {
    return this.perk()
  }

  perk() {
    const providedPerk = this.$entities.perk
    if (!providedPerk) {
      return this.$send({
        message: this.$t(Strings.ASK_FOR_PERK),
        listen: true,
      })
    }

    const providedPerkName = this.$entities.perk!.resolved!
    const perk = getPerk(providedPerkName)
    if (!perk) {
      const perkNotFoundSpeakOutput = this.$t(Strings.PERK_NOT_FOUND)
      return this.$send(CardOutput, {
        speakOutput: perkNotFoundSpeakOutput,
        cardTitle: 'Not found',
      })
    }

    const perkName = perk.name
    if (!perk.effect) {
      const unknownEffectSpeakOutput = this.$t(Strings.UNKNOWN_PERK_EFFECT)
      return this.$send(CardOutput, {
        speakOutput: unknownEffectSpeakOutput,
        cardTitle: perkName,
      })
    }

    const indefiniteArticle = getIndefiniteArticleForPerkType(perk.type)
    const perkEffect = perk.effect.replace('by', '')
    const perkType = perk.type
    const accordingToSource = this.$t(Strings.ACCORDING_TO_SOURCE, { source: 'ZenithMMO Fandom Wiki' })
    const effectSpeakOutput = this.$t(Strings.PERK, { indefiniteArticle, perkName, perkType, perkEffect })
    const speakOutput = `${accordingToSource}, ${effectSpeakOutput}`
    return this.$send(CardOutput, {
      speakOutput: speakOutput,
      cardTitle: perkName,
    })
  }

  UNHANDLED(): Promise<void> {
    return this.START()
  }
}
