export type LatLng = {
  latitude: number
  longitude: number
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

// ハーサイン公式による2点間の距離（m）
export function getDistanceMeters(a: LatLng, b: LatLng): number {
  const earthRadius = 6371000
  const dLat = toRadians(b.latitude - a.latitude)
  const dLng = toRadians(b.longitude - a.longitude)
  const lat1 = toRadians(a.latitude)
  const lat2 = toRadians(b.latitude)

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

  return 2 * earthRadius * Math.asin(Math.sqrt(h))
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `約${Math.round(meters)}m`
  }
  return `約${(meters / 1000).toFixed(1)}km`
}
