import { ALL_CATEGORIES } from './filterSpots.ts'

type SpotFilterProps = {
  query: string
  category: string
  categories: string[]
  onQueryChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

function SpotFilter({
  query,
  category,
  categories,
  onQueryChange,
  onCategoryChange,
}: SpotFilterProps) {
  return (
    <div className="space-y-2 border-b border-slate-200 bg-white px-4 py-3">
      <label className="block">
        <span className="sr-only">スポットを検索</span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="名前・カテゴリで検索（例: 神社）"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </label>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="カテゴリで絞り込み">
        {[ALL_CATEGORIES, ...categories].map((value) => {
          const isActive = value === category
          return (
            <button
              key={value}
              type="button"
              onClick={() => onCategoryChange(value)}
              aria-pressed={isActive}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {value === ALL_CATEGORIES ? 'すべて' : value}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SpotFilter
