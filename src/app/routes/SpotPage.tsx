import { useParams } from 'react-router-dom'
import SpotDetail from '@/features/spots/SpotDetail.tsx'
import { spots } from '@/mocks/spots.ts'
import NotFound from './NotFound.tsx'

function SpotPage() {
  const { spotId } = useParams()
  const index = spots.findIndex((spot) => spot.id === spotId)
  const spot = index >= 0 ? spots[index] : undefined

  if (!spot) {
    return <NotFound />
  }

  const prevSpot = index > 0 ? spots[index - 1] : null
  const nextSpot = index < spots.length - 1 ? spots[index + 1] : null

  return <SpotDetail spot={spot} prevSpot={prevSpot} nextSpot={nextSpot} />
}

export default SpotPage
