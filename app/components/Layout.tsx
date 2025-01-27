'use client'

import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
