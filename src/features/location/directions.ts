import type { CurrentPosition } from './useCurrentPosition.ts'

export type SpotDestination = {
  latitude: number
  longitude: number
  name: string
}

export function buildGoogleMapsDirectionsUrl(
  destination: SpotDestination,
  origin?: CurrentPosition | null
): string {
  const params = new URLSearchParams({
    api: '1',
    destination: `${destination.latitude},${destination.longitude}`,
    travelmode: 'walking',
  })
  if (origin != null) {
    params.set('origin', `${origin.latitude},${origin.longitude}`)
  }
  return `https://www.google.com/maps/dir/?${params.toString()}`
}

export function buildAppleMapsDirectionsUrl(
  destination: SpotDestination,
  origin?: CurrentPosition | null
): string {
  const params = new URLSearchParams({
    daddr: `${destination.latitude},${destination.longitude}`,
    dirflg: 'w',
  })
  if (origin != null) {
    params.set('saddr', `${origin.latitude},${origin.longitude}`)
  }
  return `https://maps.apple.com/?${params.toString()}`
}
