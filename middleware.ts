import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Temporary middleware without Clerk for development testing
export function middleware(request: NextRequest) {
  // Security headers
  const response = NextResponse.next()
  
  // Security headers for development
  response.headers.set("X-DNS-Prefetch-Control", "on")
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Rate limiting headers
  response.headers.set("X-RateLimit-Limit", "100")
  response.headers.set("X-RateLimit-Remaining", "99")

  // For development, allow all requests
  return response
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

