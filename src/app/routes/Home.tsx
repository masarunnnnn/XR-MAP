import SpotList from '@/features/spots/SpotList.tsx'
import { spots } from '@/mocks/spots.ts'

function Home() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-48 shrink-0 items-center justify-center border-b border-slate-200 bg-slate-100">
        <p className="text-sm text-slate-500">地図をここに表示します</p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <SpotList spots={spots} />
      </div>
    </div>
  )
}

export default Home
