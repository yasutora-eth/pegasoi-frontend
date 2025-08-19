"use client"

import { SystemStatus } from "@/components/SystemStatus"
import { QuickActions } from "@/components/QuickActions"

export default function SystemCheckPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">System Check</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SystemStatus />
        <QuickActions />
      </div>
    </div>
  )
}
