"use client"

import type React from "react"

// Temporary no-auth version for development testing
export function PrivateRoute({ children }: { children: React.ReactNode }) {
  // For development, allow all access
  return <>{children}</>
}
