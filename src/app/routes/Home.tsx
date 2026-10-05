import { useState } from 'react'
import SpotMap from '@/features/map/SpotMap.tsx'
import SpotList from '@/features/spots/SpotList.tsx'
import { spots } from '@/mocks/spots.ts'

function Home() {
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null)

  return (
    <div className="flex h-full flex-col">
      <div className="h-64 shrink-0 border-b border-slate-200">
        <SpotMap spots={spots} selectedSpotId={selectedSpotId} className="h-full w-full" />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <SpotList spots={spots} selectedSpotId={selectedSpotId} onSelect={setSelectedSpotId} />
      </div>
    </div>
  )
}

export default Home
