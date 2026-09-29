import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
      <p className="text-base font-bold">ページが見つかりません</p>
      <Link to="/" className="text-sm text-slate-500 underline hover:text-slate-800">
        トップに戻る
      </Link>
    </div>
  )
}

export default NotFound
