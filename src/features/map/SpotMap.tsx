import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Spot } from '@/features/spots/types.ts'

type SpotMapProps = {
  spots: Spot[]
  className?: string
}

const DEFAULT_STYLE_URL = 'https://demotiles.maplibre.org/style.json'
const DEFAULT_CENTER: [number, number] = [139.703, 35.6895]

function SpotMap({ spots, className }: SpotMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
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

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) {
      return
    }

    const markers: maplibregl.Marker[] = spots.map((spot) => {
      const el = document.createElement('button')
      el.type = 'button'
      el.className = 'spot-marker'
      el.title = spot.name
      el.setAttribute('aria-label', spot.name)

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

      return marker
    })

    if (spots.length > 0) {
      const bounds = new maplibregl.LngLatBounds()
      spots.forEach((spot) => bounds.extend([spot.longitude, spot.latitude]))
      map.fitBounds(bounds, { padding: 48, maxZoom: 15, duration: 0 })
    }

    return () => {
      markers.forEach((marker) => marker.remove())
    }
  }, [spots, navigate])

  return (
    <div className={className}>
      <div ref={containerRef} className="h-full w-full" />
    </div>
  )
}

export default SpotMap
