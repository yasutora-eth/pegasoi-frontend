"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Activity, Database, Zap, Clock, TrendingUp, Server } from 'lucide-react'

interface PerformanceMetrics {
  apiResponseTime: number
  redisHitRate: number
  graphqlCacheHitRate: number
  totalRequests: number
  errorRate: number
  uptime: number
  memoryUsage: number
  activeConnections: number
}

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down'
  database: 'connected' | 'disconnected'
  redis: 'connected' | 'disconnected'
  graphql: 'connected' | 'disconnected'
  lastCheck: string
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    apiResponseTime: 0,
    redisHitRate: 0,
    graphqlCacheHitRate: 0,
    totalRequests: 0,
    errorRate: 0,
    uptime: 0,
    memoryUsage: 0,
    activeConnections: 0,
  })

  const [health, setHealth] = useState<SystemHealth>({
    status: 'healthy',
    database: 'connected',
    redis: 'connected',
    graphql: 'connected',
    lastCheck: new Date().toISOString(),
  })

  const [isMonitoring, setIsMonitoring] = useState(false)

  // Simulate real-time metrics (in production, this would come from your backend)
  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      // Simulate realistic metrics
      setMetrics(prev => ({
        apiResponseTime: Math.random() * 200 + 50, // 50-250ms
        redisHitRate: Math.random() * 20 + 80, // 80-100%
        graphqlCacheHitRate: Math.random() * 30 + 70, // 70-100%
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 10),
        errorRate: Math.random() * 2, // 0-2%
        uptime: prev.uptime + 1,
        memoryUsage: Math.random() * 20 + 60, // 60-80%
        activeConnections: Math.floor(Math.random() * 50) + 10, // 10-60
      }))

      // Simulate health checks
      setHealth(prev => ({
        ...prev,
        status: Math.random() > 0.95 ? 'degraded' : 'healthy',
        lastCheck: new Date().toISOString(),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'connected':
        return 'bg-green-500'
      case 'degraded':
        return 'bg-yellow-500'
      case 'down':
      case 'disconnected':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  // const getPerformanceLevel = (value: number, thresholds: [number, number]) => {
  //   if (value >= thresholds[1]) return 'excellent'
  //   if (value >= thresholds[0]) return 'good'
  //   return 'needs-attention'
  // }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Performance Monitor
            </h2>
            <p className="text-muted-foreground">
              Real-time system performance and Redis optimization metrics
            </p>
          </div>
        </div>
        <Badge 
          variant={isMonitoring ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setIsMonitoring(!isMonitoring)}
        >
          {isMonitoring ? 'Monitoring Active' : 'Start Monitoring'}
        </Badge>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(health.status)}`} />
              <div>
                <p className="text-sm font-medium">System Status</p>
                <p className="text-xs text-muted-foreground capitalize">{health.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Redis Cache</p>
                <p className="text-xs text-muted-foreground">{metrics.redisHitRate.toFixed(1)}% hit rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Response Time</p>
                <p className="text-xs text-muted-foreground">{metrics.apiResponseTime.toFixed(0)}ms avg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Error Rate</p>
                <p className="text-xs text-muted-foreground">{metrics.errorRate.toFixed(2)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Redis Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-500" />
              Redis Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Cache Hit Rate</span>
                <span>{metrics.redisHitRate.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.redisHitRate} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Memory Usage</span>
                <span>{metrics.memoryUsage.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.memoryUsage} className="h-2" />
            </div>

            <div className="flex justify-between text-sm">
              <span>Active Connections</span>
              <Badge variant="outline">{metrics.activeConnections}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* API Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-green-500" />
              API Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>GraphQL Cache Hit Rate</span>
                <span>{metrics.graphqlCacheHitRate.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.graphqlCacheHitRate} className="h-2" />
            </div>

            <div className="flex justify-between text-sm">
              <span>Total Requests</span>
              <Badge variant="outline">{metrics.totalRequests.toLocaleString()}</Badge>
            </div>

            <div className="flex justify-between text-sm">
              <span>Uptime</span>
              <Badge variant="outline">{Math.floor(metrics.uptime / 60)}m {metrics.uptime % 60}s</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Alerts */}
      {metrics.redisHitRate < 80 && (
        <Alert>
          <Database className="h-4 w-4" />
          <AlertDescription>
            Redis cache hit rate is below optimal (80%). Consider reviewing cache strategies.
          </AlertDescription>
        </Alert>
      )}

      {metrics.apiResponseTime > 200 && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            API response time is elevated ({metrics.apiResponseTime.toFixed(0)}ms). Monitor backend performance.
          </AlertDescription>
        </Alert>
      )}

      {metrics.errorRate > 1 && (
        <Alert variant="destructive">
          <Activity className="h-4 w-4" />
          <AlertDescription>
            Error rate is above threshold ({metrics.errorRate.toFixed(2)}%). Check system logs.
          </AlertDescription>
        </Alert>
      )}

      {/* Optimization Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Redis cache hit rate is excellent ({metrics.redisHitRate.toFixed(1)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>GraphQL caching is performing well ({metrics.graphqlCacheHitRate.toFixed(1)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span>Consider implementing request batching for better performance</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
