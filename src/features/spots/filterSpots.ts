import type { Spot } from './types.ts'

export const ALL_CATEGORIES = 'all'

export function getCategories(spots: Spot[]): string[] {
  return Array.from(new Set(spots.map((spot) => spot.category)))
}

export function filterSpots(spots: Spot[], query: string, category: string): Spot[] {
  const normalizedQuery = query.trim().toLowerCase()

  return spots.filter((spot) => {
    if (category !== ALL_CATEGORIES && spot.category !== category) {
      return false
    }
    if (normalizedQuery === '') {
      return true
    }
    const haystack = `${spot.name} ${spot.category} ${spot.description}`.toLowerCase()
    return haystack.includes(normalizedQuery)
  })
}
