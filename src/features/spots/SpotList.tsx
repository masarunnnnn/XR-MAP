import { Link } from 'react-router-dom'
import type { Spot } from './types.ts'

type SpotListProps = {
  spots: Spot[]
}

function SpotList({ spots }: SpotListProps) {
  return (
    <ul className="divide-y divide-slate-200">
      {spots.map((spot) => (
        <li key={spot.id}>
          <Link
            to={`/spots/${spot.id}`}
            className="block px-4 py-3 transition-colors hover:bg-slate-100"
          >
            <p className="text-sm font-semibold">{spot.name}</p>
            <p className="mt-0.5 text-xs text-slate-500">{spot.category}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SpotList
