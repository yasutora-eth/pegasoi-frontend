'use client'

import { SystemStatus } from '@/components/SystemStatus'
import { QuickActions } from '@/components/QuickActions'

export default function SystemCheckPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">System Check</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SystemStatus />
        <QuickActions />
      </div>
    </div>
  )
}
