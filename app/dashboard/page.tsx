"use client"

import { PrivateRoute } from "@/components/PrivateRoute"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
// import { useAuth } from "@/components/AuthProvider"

export default function Dashboard() {
  // const { user } = useAuth()
  const user = { role: 'admin' } // Mock user for dev mode

  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">User Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>My Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/my-articles" className="text-primary hover:underline">
                View My Articles
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>In Review</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/in-review" className="text-primary hover:underline">
                View Articles in Review
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Published</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/published" className="text-primary hover:underline">
                View Published Articles
              </Link>
            </CardContent>
          </Card>
          {user?.role === "admin" && (
            <Card>
              <CardHeader>
                <CardTitle>Archive</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/archive" className="text-primary hover:underline">
                  View Archived Articles
                </Link>
              </CardContent>
            </Card>
          )}
          {user?.role === "publisher" && (
            <Card>
              <CardHeader>
                <CardTitle>Publish Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/publish" className="text-primary hover:underline">
                  Review and Publish Articles
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PrivateRoute>
  )
}
