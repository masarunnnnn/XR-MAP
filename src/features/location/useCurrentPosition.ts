import { useEffect, useState } from 'react'

export type CurrentPosition = {
  latitude: number
  longitude: number
  accuracy: number
}

type UseCurrentPositionResult = {
  position: CurrentPosition | null
  error: string | null
  supported: boolean
}

export function useCurrentPosition(): UseCurrentPositionResult {
  const supported = typeof navigator !== 'undefined' && 'geolocation' in navigator
  const [position, setPosition] = useState<CurrentPosition | null>(null)
  const [error, setError] = useState<string | null>(() =>
    supported ? null : 'このブラウザでは位置情報が使えません'
  )

  useEffect(() => {
    if (!supported) {
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        })
        setError(null)
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setError('位置情報の利用が許可されていません')
        } else if (err.code === err.TIMEOUT) {
          setError('位置情報の取得がタイムアウトしました')
        } else {
          setError('現在地を取得できませんでした')
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [supported])

  return { position, error, supported }
}
