import type { ReactNode } from 'react'
import Header from './Header.tsx'

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-full flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="min-h-0 flex-1">{children}</main>
    </div>
  )
}

export default Layout
