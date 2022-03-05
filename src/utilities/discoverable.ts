import cookingItems from '../data/cookingItems.json'

export type Discoverable = {
  title: string
  additionalText?: string
  sources?: string[]
}

export function getDiscoverable(name: string) {
  return cookingItems.find((discoverable) => discoverable.title.toLowerCase() === name.toLowerCase())
}

export function getDiscoverableText(discoverable: Discoverable) {
  const locations = discoverable.sources!.join(', ')
  if (discoverable.additionalText) {
    return discoverable.additionalText.replace(/([0-9]+)/, '$1 Zen').concat(` ${locations}`)
  }
  return `${discoverable.title} can be found in the following locations: ${locations}`
}
