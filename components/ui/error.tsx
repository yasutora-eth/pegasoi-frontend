import * as React from 'react'
import { AlertTriangle, RefreshCw, X } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { cn } from '@/lib/utils'

export interface ErrorStateProps {
  title?: string
  message?: string
  variant?: 'default' | 'cyber'
  onRetry?: () => void
  onDismiss?: () => void
  className?: string
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  variant = 'default',
  onRetry,
  onDismiss,
  className,
}) => (
  <Card
    className={cn(
      'border-destructive/50 bg-destructive/5',
      variant === 'cyber' && 'cyber-card border-red-500/30 bg-red-900/10',
      className
    )}
  >
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle
            className={cn(
              'h-5 w-5 text-destructive',
              variant === 'cyber' && 'text-red-400'
            )}
          />
          <CardTitle
            className={cn(
              'text-destructive',
              variant === 'cyber' && 'text-red-400'
            )}
          >
            {title}
          </CardTitle>
        </div>
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            className={cn(
              'h-6 w-6 text-destructive hover:text-destructive',
              variant === 'cyber' && 'text-red-400 hover:text-red-300'
            )}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <p
        className={cn(
          'text-sm text-muted-foreground',
          variant === 'cyber' && 'text-red-300/70'
        )}
      >
        {message}
      </p>
      {onRetry && (
        <Button
          variant={variant === 'cyber' ? 'cyber' : 'outline'}
          size="sm"
          onClick={onRetry}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </CardContent>
  </Card>
)

export interface CyberErrorProps {
  title?: string
  message?: string
  errorCode?: string
  onRetry?: () => void
  onDismiss?: () => void
  className?: string
}

const CyberError: React.FC<CyberErrorProps> = ({
  title = 'SYSTEM ERROR',
  message = 'Critical system malfunction detected. Attempting recovery protocols.',
  errorCode,
  onRetry,
  onDismiss,
  className,
}) => (
  <div
    className={cn('cyber-card border-red-500/30 bg-red-900/10 p-8', className)}
  >
    <div className="space-y-6 text-center">
      <div className="relative">
        <AlertTriangle className="mx-auto h-16 w-16 animate-pulse text-red-400" />
        <div className="absolute inset-0 animate-ping">
          <AlertTriangle className="mx-auto h-16 w-16 text-red-400 opacity-20" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-glow text-2xl font-bold uppercase tracking-wider text-red-400">
          {title}
        </h2>
        {errorCode && (
          <p className="font-mono text-sm text-red-300/70">
            ERROR CODE: {errorCode}
          </p>
        )}
      </div>

      <p className="mx-auto max-w-md text-red-300/80">{message}</p>

      <div className="flex justify-center gap-4">
        {onRetry && (
          <Button variant="cyber" onClick={onRetry} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            RETRY OPERATION
          </Button>
        )}
        {onDismiss && (
          <Button
            variant="outline"
            onClick={onDismiss}
            className="border-red-400/30 text-red-400 hover:bg-red-400/10"
          >
            DISMISS
          </Button>
        )}
      </div>

      <div className="data-stream mx-auto h-1 w-48 opacity-50" />
    </div>
  </div>
)

export interface GraphQLErrorProps {
  error: Error | null
  onRetry?: () => void
  variant?: 'default' | 'cyber'
  className?: string
}

const GraphQLError: React.FC<GraphQLErrorProps> = ({
  error,
  onRetry,
  variant = 'default',
  className,
}) => {
  if (!error) return null

  const isNetworkError =
    error.message.includes('Network error') || error.message.includes('fetch')

  const title = isNetworkError ? 'Connection Error' : 'Data Error'
  const message = isNetworkError
    ? 'Unable to connect to the server. Please check your connection and try again.'
    : error.message

  if (variant === 'cyber') {
    return (
      <CyberError
        title={isNetworkError ? 'CONNECTION LOST' : 'DATA CORRUPTION'}
        message={message}
        errorCode={isNetworkError ? 'NET_001' : 'DATA_001'}
        onRetry={onRetry}
        className={className}
      />
    )
  }

  return (
    <ErrorState
      title={title}
      message={message}
      onRetry={onRetry}
      className={className}
    />
  )
}

export { ErrorState, CyberError, GraphQLError }
