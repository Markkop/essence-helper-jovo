import perks from '../data/perks.json'

export type Perk = {
  id: string
  name: string
  effect?: string
  type: string
  tier1?: string
  tier2?: string
  tier3?: string
}

export function getPerk(name: string): Perk | undefined {
  return perks.find((perk: Perk) => perk.name.toLowerCase() === name.toLowerCase())
}

export function getIndefiniteArticleForPerkType(perkType: string): string {
  if (perkType === 'active') return 'an'
  return 'a'
}

export function parsePerkEffect(effect: string): string {
  return effect
    .replace(/by|\[|\]/g, '')
    .replace(/CD/g, 'cooldown')
    .replace(/([0-9])s/g, '$1 seconds')
}
