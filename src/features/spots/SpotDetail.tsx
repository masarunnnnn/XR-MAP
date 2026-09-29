import { Link } from 'react-router-dom'
import type { Spot } from './types.ts'

type SpotDetailProps = {
  spot: Spot
}

function SpotDetail({ spot }: SpotDetailProps) {
  return (
    <article className="p-4">
      <Link to="/" className="text-sm text-slate-500 underline hover:text-slate-800">
        一覧に戻る
      </Link>
      <h2 className="mt-2 text-lg font-bold">{spot.name}</h2>
      <p className="mt-1 text-xs text-slate-500">{spot.category}</p>
      <p className="mt-3 text-sm leading-6">{spot.description}</p>
      <p className="mt-3 text-xs text-slate-500">
        緯度 {spot.latitude} / 経度 {spot.longitude}
      </p>
    </article>
  )
}

export default SpotDetail
