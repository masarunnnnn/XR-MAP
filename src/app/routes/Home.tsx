import SpotMap from '@/features/map/SpotMap.tsx'
import SpotList from '@/features/spots/SpotList.tsx'
import { spots } from '@/mocks/spots.ts'

function Home() {
  return (
    <div className="flex h-full flex-col">
      <div className="h-64 shrink-0 border-b border-slate-200">
        <SpotMap spots={spots} className="h-full w-full" />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <SpotList spots={spots} />
      </div>
    </div>
  )
}

export default Home
