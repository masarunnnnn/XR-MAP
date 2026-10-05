import { Link } from 'react-router-dom'
import type { Spot } from './types.ts'

type SpotListProps = {
  spots: Spot[]
  selectedSpotId?: string | null
  onSelect?: (spotId: string | null) => void
}

function SpotList({ spots, selectedSpotId, onSelect }: SpotListProps) {
  return (
    <ul className="divide-y divide-slate-200">
      {spots.map((spot) => {
        const isSelected = spot.id === selectedSpotId
        return (
          <li key={spot.id}>
            <Link
              to={`/spots/${spot.id}`}
              className={`block px-4 py-3 transition-colors hover:bg-slate-100 ${
                isSelected ? 'bg-blue-50' : ''
              }`}
              onMouseEnter={() => onSelect?.(spot.id)}
              onMouseLeave={() => onSelect?.(null)}
              onFocus={() => onSelect?.(spot.id)}
              onBlur={() => onSelect?.(null)}
            >
              <p className="text-sm font-semibold">{spot.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">{spot.category}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default SpotList
