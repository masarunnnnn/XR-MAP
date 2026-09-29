import { useParams } from 'react-router-dom'
import SpotDetail from '@/features/spots/SpotDetail.tsx'
import { findSpot } from '@/mocks/spots.ts'
import NotFound from './NotFound.tsx'

function SpotPage() {
  const { spotId } = useParams()
  const spot = findSpot(spotId)

  if (!spot) {
    return <NotFound />
  }

  return <SpotDetail spot={spot} />
}

export default SpotPage
