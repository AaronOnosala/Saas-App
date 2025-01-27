'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="mt-8">
        <Link href="/create" className={`block px-4 py-2 ${pathname === '/create' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
          Create
        </Link>
        <Link href="/dashboard" className={`block px-4 py-2 ${pathname === '/dashboard' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
          Dashboard
        </Link>
      </nav>
    </aside>
  )
}
