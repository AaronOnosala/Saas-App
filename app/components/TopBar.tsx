'use client'

import { usePathname } from 'next/navigation'

export default function TopBar() {
  const pathname = usePathname()
  const screenName = pathname === '/create' ? 'Create' : 'Dashboard'

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">{screenName}</h1>
      </div>
    </header>
  )
}
