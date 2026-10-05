import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Spot } from '@/features/spots/types.ts'

type SpotMapProps = {
  spots: Spot[]
  selectedSpotId?: string | null
  className?: string
}

const DEFAULT_STYLE_URL = 'https://demotiles.maplibre.org/style.json'
const DEFAULT_CENTER: [number, number] = [139.703, 35.6895]

function SpotMap({ spots, selectedSpotId, className }: SpotMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map())
  const fittedRef = useRef(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return
    }

    const styleUrl = import.meta.env.VITE_MAP_STYLE_URL || DEFAULT_STYLE_URL

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: styleUrl as string,
      center: DEFAULT_CENTER,
      zoom: 14,
    })
    mapRef.current = map
    setIsLoaded(false)
    fittedRef.current = false

    map.addControl(new maplibregl.NavigationControl(), 'top-right')
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserLocation: true,
        showAccuracyCircle: true,
      }),
      'top-right'
    )

    const handleLoad = () => setIsLoaded(true)
    if (map.isStyleLoaded()) {
      handleLoad()
    } else {
      map.on('load', handleLoad)
    }

    return () => {
      map.off('load', handleLoad)
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const markers = markersRef.current
    if (!map || !isLoaded) {
      return
    }

    // 既存マーカーを掃除して作り直す
    markers.forEach((marker) => marker.remove())
    markers.clear()

    spots.forEach((spot) => {
      const el = document.createElement('button')
      el.type = 'button'
      el.className = 'spot-marker'
      el.title = spot.name
      el.setAttribute('aria-label', spot.name)
      el.dataset.spotId = spot.id

      el.addEventListener('click', () => {
        navigate(`/spots/${spot.id}`)
      })

      const popup = new maplibregl.Popup({ offset: 24 }).setHTML(
        `<strong>${spot.name}</strong><br /><span>${spot.category}</span>`
      )

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([spot.longitude, spot.latitude])
        .setPopup(popup)
        .addTo(map)

      markers.set(spot.id, marker)
    })

    // 初回のみスポット全体にフィット（2回目以降はユーザ操作を上書きしない）
    if (!fittedRef.current && spots.length > 0) {
      const bounds = new maplibregl.LngLatBounds()
      spots.forEach((spot) => bounds.extend([spot.longitude, spot.latitude]))
      map.fitBounds(bounds, { padding: 48, maxZoom: 15, duration: 0 })
      fittedRef.current = true
    }

    return () => {
      markers.forEach((marker) => marker.remove())
      markers.clear()
    }
  }, [spots, isLoaded, navigate])

  // 一覧ホバーとの連携：選択マーカーだけ強調
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      marker.getElement().classList.toggle('is-selected', id === selectedSpotId)
    })
  }, [selectedSpotId])

  return (
    <div className={className}>
      <div ref={containerRef} className="h-full w-full" />
    </div>
  )
}

export default SpotMap
