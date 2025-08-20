"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { GraphQLArticleManager } from '@/components/GraphQLArticleManager'
import { RedisOptimizedSearch } from '@/components/RedisOptimizedSearch'
import { PerformanceMonitor } from '@/components/PerformanceMonitor'
import { Activity, Database, Zap, Globe } from 'lucide-react'

export default function GraphQLDashboard() {
  const [activeTab, setActiveTab] = useState('articles')

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GraphQL Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time article management with GraphQL + Redis backend
            </p>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Backend</p>
                  <p className="text-xs text-muted-foreground">Redis + FastAPI</p>
                </div>
                <Badge variant="default" className="ml-auto">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">GraphQL</p>
                  <p className="text-xs text-muted-foreground">Real-time API</p>
                </div>
                <Badge variant="default" className="ml-auto">Connected</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Live Updates</p>
                  <p className="text-xs text-muted-foreground">Subscriptions</p>
                </div>
                <Badge variant="default" className="ml-auto">Enabled</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Performance</p>
                  <p className="text-xs text-muted-foreground">Optimized</p>
                </div>
                <Badge variant="default" className="ml-auto">Fast</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Alert */}
        <Alert className="bg-blue-50 border-blue-200">
          <Activity className="h-4 w-4" />
          <AlertDescription>
            This dashboard demonstrates GraphQL integration with the Redis backend. 
            Features include real-time updates, optimistic UI updates, and intelligent caching.
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="search">Redis Search</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="mt-6">
          <GraphQLArticleManager />
        </TabsContent>

        <TabsContent value="search" className="mt-6">
          <RedisOptimizedSearch />
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <PerformanceMonitor />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>GraphQL Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">GraphQL Endpoint</p>
                  <p className="text-sm text-muted-foreground">
                    {process.env.NEXT_PUBLIC_GRAPHQL_URL}
                  </p>
                </div>
                <Badge variant="outline">Connected</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Real-time Subscriptions</p>
                  <p className="text-sm text-muted-foreground">
                    WebSocket connection for live updates
                  </p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Cache Strategy</p>
                  <p className="text-sm text-muted-foreground">
                    Apollo Client InMemory Cache
                  </p>
                </div>
                <Badge variant="default">Active</Badge>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  Clear GraphQL Cache
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
