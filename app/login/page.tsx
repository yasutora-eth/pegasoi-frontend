"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/components/AuthProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Crown } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("demo@example.com")
  const [password, setPassword] = useState("password")
  const [role, setRole] = useState<"user" | "publisher" | "admin">("user")
  // const { login, isAuthenticated } = useAuth()
  const isAuthenticated = false
  const login = (role: string) => console.log(`Mock login as ${role}`)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(role)
    router.push("/dashboard")
  }

  const roleIcons = {
    user: <User className="h-4 w-4" />,
    publisher: <Shield className="h-4 w-4" />,
    admin: <Crown className="h-4 w-4" />,
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Demo Login</CardTitle>
          <div className="text-center">
            <Badge variant="secondary" className="text-xs">
              Preview Mode - No Real Authentication
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@example.com"
                disabled
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                disabled
              />
            </div>

            <div>
              <Label htmlFor="role">Select Role</Label>
              <Select value={role} onValueChange={(value: "user" | "publisher" | "admin") => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">
                    <div className="flex items-center gap-2">
                      {roleIcons.user}
                      User
                    </div>
                  </SelectItem>
                  <SelectItem value="publisher">
                    <div className="flex items-center gap-2">
                      {roleIcons.publisher}
                      Publisher
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      {roleIcons.admin}
                      Admin
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Login as {role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Role Permissions:</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                {roleIcons.user}
                <span>
                  <strong>User:</strong> View articles, submit articles
                </span>
              </div>
              <div className="flex items-center gap-2">
                {roleIcons.publisher}
                <span>
                  <strong>Publisher:</strong> + Review and publish articles
                </span>
              </div>
              <div className="flex items-center gap-2">
                {roleIcons.admin}
                <span>
                  <strong>Admin:</strong> + Archive articles, full access
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
