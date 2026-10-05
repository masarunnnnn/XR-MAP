import { useMemo, useState } from 'react'
import SpotMap from '@/features/map/SpotMap.tsx'
import { ALL_CATEGORIES, filterSpots, getCategories } from '@/features/spots/filterSpots.ts'
import SpotFilter from '@/features/spots/SpotFilter.tsx'
import SpotList from '@/features/spots/SpotList.tsx'
import { spots } from '@/mocks/spots.ts'

function Home() {
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>(ALL_CATEGORIES)

  const categories = useMemo(() => getCategories(spots), [])
  const filteredSpots = useMemo(() => filterSpots(spots, query, category), [query, category])
  const isFiltering = query.trim() !== '' || category !== ALL_CATEGORIES
  const activeSelectedSpotId = filteredSpots.some((spot) => spot.id === selectedSpotId)
    ? selectedSpotId
    : null

  const handleClear = () => {
    setQuery('')
    setCategory(ALL_CATEGORIES)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="h-64 shrink-0 border-b border-slate-200">
        <SpotMap
          spots={filteredSpots}
          selectedSpotId={activeSelectedSpotId}
          className="h-full w-full"
        />
      </div>
      <SpotFilter
        query={query}
        category={category}
        categories={categories}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
      />
      <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-500">
        <span>
          {filteredSpots.length} / {spots.length} 件
        </span>
        {isFiltering && (
          <button type="button" onClick={handleClear} className="underline hover:text-slate-800">
            条件をクリア
          </button>
        )}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <SpotList
          spots={filteredSpots}
          selectedSpotId={activeSelectedSpotId}
          onSelect={setSelectedSpotId}
        />
      </div>
    </div>
  )
}

export default Home
