import { Link } from 'react-router-dom'
import SpotMap from '@/features/map/SpotMap.tsx'
import { formatDistance, getDistanceMeters } from '@/features/location/distance.ts'
import { useCurrentPosition } from '@/features/location/useCurrentPosition.ts'
import type { Spot } from './types.ts'

type SpotDetailProps = {
  spot: Spot
  prevSpot?: Spot | null
  nextSpot?: Spot | null
}

function SpotDetail({ spot, prevSpot, nextSpot }: SpotDetailProps) {
  const { position, error } = useCurrentPosition()
  const distance =
    position != null
      ? getDistanceMeters(position, { latitude: spot.latitude, longitude: spot.longitude })
      : null

  return (
    <div className="flex h-full flex-col">
      <div className="h-64 shrink-0 border-b border-slate-200">
        <SpotMap spots={[spot]} selectedSpotId={spot.id} className="h-full w-full" />
      </div>
      <article className="min-h-0 flex-1 overflow-y-auto p-4">
        <Link to="/" className="text-sm text-slate-500 underline hover:text-slate-800">
          一覧に戻る
        </Link>
        <h2 className="mt-2 text-lg font-bold">{spot.name}</h2>
        <p className="mt-1 text-xs text-slate-500">{spot.category}</p>
        {distance != null ? (
          <p className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            現在地から {formatDistance(distance)}
          </p>
        ) : (
          <p className="mt-2 text-xs text-slate-500">
            {error ?? '現在地を取得中…許可するとここからの距離が表示されます'}
          </p>
        )}
        <p className="mt-3 text-sm leading-6">{spot.description}</p>
        <p className="mt-3 text-xs text-slate-500">
          緯度 {spot.latitude} / 経度 {spot.longitude}
        </p>
        <nav className="mt-6 flex items-center justify-between gap-2 border-t border-slate-200 pt-4">
          {prevSpot ? (
            <Link
              to={`/spots/${prevSpot.id}`}
              className="text-sm text-slate-600 underline hover:text-slate-900"
            >
              ← {prevSpot.name}
            </Link>
          ) : (
            <span />
          )}
          {nextSpot ? (
            <Link
              to={`/spots/${nextSpot.id}`}
              className="text-sm text-slate-600 underline hover:text-slate-900"
            >
              {nextSpot.name} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </div>
  )
}

export default SpotDetail
