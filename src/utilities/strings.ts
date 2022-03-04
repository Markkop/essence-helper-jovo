export enum Strings {
  LAUNCH = 'LAUNCH',
  HELP = 'HELP',
  ERROR = 'ERROR',
  FALLBACK = 'FALLBACK',
  ABOUT = 'ABOUT',
  UNAVAILABLE_INTENT = 'UNAVAILABLE_INTENT',
  SKILL_NAME = 'SKILL_NAME',
  PERK = 'PERK',
  SOURCE = 'SOURCE',
  ASK_FOR_PERK = 'ASK_FOR_PERK',
  ASK_FOR_DISCOVERABLE = 'ASK_FOR_DISCOVERABLE',
  UNKNOWN_PERK_EFFECT = 'UNKNOWN_PERK_EFFECT',
  UNKNOWN_SOURCE = 'UNKNOWN_SOURCE',
  PERK_NOT_FOUND = 'PERK_NOT_FOUND',
  ITEM_NOT_FOUND = 'ITEM_NOT_FOUND',
  ACCORDING_TO_SOURCE = 'ACCORDING_TO_SOURCE',
}
interface IStrings {
  [Strings.LAUNCH]: string
  [Strings.PERK]: string
  [Strings.SOURCE]: string
  [Strings.ASK_FOR_PERK]: string
  [Strings.ASK_FOR_DISCOVERABLE]: string
  [Strings.UNKNOWN_PERK_EFFECT]: string
  [Strings.UNKNOWN_SOURCE]: string
  [Strings.ACCORDING_TO_SOURCE]: string
  [Strings.PERK_NOT_FOUND]: string
  [Strings.ITEM_NOT_FOUND]: string
  [Strings.SKILL_NAME]: string
  [Strings.HELP]: string
  [Strings.FALLBACK]: string
  [Strings.ERROR]: string
}

export const en = {
  translation: {
    LAUNCH:
      'Hello Zenithian. I can get you the effects of an equipment perk or the location of a cooking ingredient. Which one would you like to know?',
    PERK: '{{perkName}} is {{indefiniteArticle}} {{perkType}} perk with the following effect: {{perkEffect}}',
    SOURCE: '{{sourceText}}',
    ASK_FOR_PERK: 'Please, provide the name of an equipment perk.',
    ASK_FOR_DISCOVERABLE: 'Please, provide the name of a cooking ingredient.',
    UNKNOWN_PERK_EFFECT: 'The effect for this perk is currently unknown.',
    UNKNOWN_SOURCE: 'The location for this item is currently unknown.',
    ACCORDING_TO_SOURCE: 'According to {{source}}',
    PERK_NOT_FOUND: 'I could not find a perk with this name. Please try again.',
    ITEM_NOT_FOUND: 'I could not find an item with this name. Please try again.',
    SKILL_NAME: 'Essence Helper',
    HELP: 'I can get you the effects of an equipment perk or the location of a cooking ingredient.',
    FALLBACK: "Sorry, I don't know that. Try again.",
    ERROR: "Sorry, I didn't understand. Try again.",
  } as IStrings,
}
