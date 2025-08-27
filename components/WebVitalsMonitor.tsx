'use client'

import { useEffect } from 'react'
import { logger } from '@/lib/utils'

interface WebVitalsMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

// Web Vitals thresholds
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
}

function getRating(
  name: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

function reportWebVitals(metric: WebVitalsMetric) {
  const { name, value, rating } = metric

  // Log in development
  logger.info(`Web Vital: ${name}`, { value, rating })

  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', name, {
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        metric_rating: rating,
        custom_parameter_1: 'web_vitals',
      })
    }

    // Example: Custom analytics endpoint
    // fetch('/api/analytics/web-vitals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metric)
    // }).catch(err => logger.error('Failed to send web vitals', err))
  }
}

export function WebVitalsMonitor() {
  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('web-vitals')
      .then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS((metric) => {
          reportWebVitals({
            ...metric,
            rating: getRating('CLS', metric.value),
          })
        })

        onFCP((metric) => {
          reportWebVitals({
            ...metric,
            rating: getRating('FCP', metric.value),
          })
        })

        onLCP((metric) => {
          reportWebVitals({
            ...metric,
            rating: getRating('LCP', metric.value),
          })
        })

        onTTFB((metric) => {
          reportWebVitals({
            ...metric,
            rating: getRating('TTFB', metric.value),
          })
        })

        // INP is the new metric replacing FID
        onINP((metric) => {
          reportWebVitals({
            ...metric,
            rating: getRating('INP', metric.value),
          })
        })
      })
      .catch((err) => {
        logger.error('Failed to load web-vitals library', err)
      })
  }, [])

  // Monitor additional performance metrics
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Monitor page load performance
    const handleLoad = () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming
        if (navigation) {
          const metrics = {
            domContentLoaded:
              navigation.domContentLoadedEventEnd -
              navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            totalPageLoad: navigation.loadEventEnd - navigation.fetchStart,
            dnsLookup:
              navigation.domainLookupEnd - navigation.domainLookupStart,
            tcpConnect: navigation.connectEnd - navigation.connectStart,
            serverResponse: navigation.responseEnd - navigation.requestStart,
          }

          logger.info('Page Load Metrics', metrics)

          // Report slow page loads
          if (metrics.totalPageLoad > 5000) {
            logger.warn('Slow page load detected', {
              duration: metrics.totalPageLoad,
            })
          }
        }
      }, 0)
    }

    // Monitor resource loading
    const handleResourceLoad = () => {
      const resources = performance.getEntriesByType('resource')
      const slowResources = resources.filter(
        (resource) => resource.duration > 1000
      )

      if (slowResources.length > 0) {
        logger.warn('Slow resources detected', {
          count: slowResources.length,
          resources: slowResources.map((r) => ({
            name: r.name,
            duration: r.duration,
          })),
        })
      }
    }

    window.addEventListener('load', handleLoad)
    window.addEventListener('load', handleResourceLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('load', handleResourceLoad)
    }
  }, [])

  // Monitor memory usage (if available)
  useEffect(() => {
    if (typeof window === 'undefined' || !(performance as any).memory) return

    const checkMemoryUsage = () => {
      const memory = (performance as any).memory
      const usedMB = memory.usedJSHeapSize / 1024 / 1024
      const totalMB = memory.totalJSHeapSize / 1024 / 1024
      const limitMB = memory.jsHeapSizeLimit / 1024 / 1024

      logger.debug('Memory Usage', {
        used: `${usedMB.toFixed(2)}MB`,
        total: `${totalMB.toFixed(2)}MB`,
        limit: `${limitMB.toFixed(2)}MB`,
        usage: `${((usedMB / limitMB) * 100).toFixed(1)}%`,
      })

      // Warn if memory usage is high
      if (usedMB / limitMB > 0.8) {
        logger.warn('High memory usage detected', { usedMB, limitMB })
      }
    }

    const interval = setInterval(checkMemoryUsage, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return null // This component doesn't render anything
}

// Hook for manual performance tracking
export function usePerformanceTracker() {
  const trackEvent = (eventName: string, startTime?: number) => {
    const endTime = performance.now()
    const duration = startTime ? endTime - startTime : 0

    logger.info(`Performance Event: ${eventName}`, { duration })

    // Report slow operations
    if (duration > 1000) {
      logger.warn(`Slow operation detected: ${eventName}`, { duration })
    }

    return endTime
  }

  const startTimer = () => performance.now()

  return { trackEvent, startTimer }
}

// Component for tracking specific component render performance
export function withPerformanceTracking<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  componentName: string
) {
  return function PerformanceTrackedComponent(props: T) {
    useEffect(() => {
      const startTime = performance.now()

      return () => {
        const endTime = performance.now()
        const renderTime = endTime - startTime

        if (renderTime > 100) {
          // Log renders taking more than 100ms
          logger.warn(`Slow component render: ${componentName}`, { renderTime })
        }
      }
    })

    return <WrappedComponent {...props} />
  }
}
