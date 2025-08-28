import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'cyber'
}

export function Skeleton({
  className,
  variant = 'default',
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md',
        variant === 'cyber'
          ? 'animate-[shimmer_2s_infinite] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 bg-[length:200%_100%]'
          : 'bg-muted',
        className
      )}
      {...props}
    />
  )
}

// Article Card Skeleton
export function ArticleCardSkeleton({
  variant = 'default',
}: {
  variant?: 'default' | 'cyber'
}) {
  return (
    <div
      className={cn(
        'space-y-4 rounded-lg border p-6',
        variant === 'cyber'
          ? 'border-cyan-500/20 bg-gray-900/50'
          : 'border-border bg-card'
      )}
    >
      <div className="space-y-2">
        <Skeleton variant={variant} className="h-4 w-3/4" />
        <Skeleton variant={variant} className="h-4 w-1/2" />
      </div>
      <div className="space-y-2">
        <Skeleton variant={variant} className="h-3 w-full" />
        <Skeleton variant={variant} className="h-3 w-full" />
        <Skeleton variant={variant} className="h-3 w-2/3" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton variant={variant} className="h-6 w-20" />
        <Skeleton variant={variant} className="h-8 w-24" />
      </div>
    </div>
  )
}

// Search Results Skeleton
export function SearchResultsSkeleton({
  count = 3,
  variant = 'default',
}: {
  count?: number
  variant?: 'default' | 'cyber'
}) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'space-y-3 rounded-lg border p-4',
            variant === 'cyber'
              ? 'border-cyan-500/20 bg-gray-900/50'
              : 'border-border bg-card'
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <Skeleton variant={variant} className="h-5 w-3/4" />
              <Skeleton variant={variant} className="h-4 w-1/3" />
            </div>
            <Skeleton variant={variant} className="h-6 w-16" />
          </div>
          <div className="space-y-2">
            <Skeleton variant={variant} className="h-3 w-full" />
            <Skeleton variant={variant} className="h-3 w-5/6" />
          </div>
          <div className="flex gap-2">
            <Skeleton variant={variant} className="h-6 w-12" />
            <Skeleton variant={variant} className="h-6 w-16" />
            <Skeleton variant={variant} className="h-6 w-14" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Dashboard Stats Skeleton
export function DashboardStatsSkeleton({
  variant = 'default',
}: {
  variant?: 'default' | 'cyber'
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'space-y-2 rounded-lg border p-6',
            variant === 'cyber'
              ? 'border-cyan-500/20 bg-gray-900/50'
              : 'border-border bg-card'
          )}
        >
          <div className="flex items-center justify-between">
            <Skeleton variant={variant} className="h-4 w-24" />
            <Skeleton variant={variant} className="h-4 w-4 rounded" />
          </div>
          <Skeleton variant={variant} className="h-8 w-16" />
          <Skeleton variant={variant} className="h-3 w-32" />
        </div>
      ))}
    </div>
  )
}

// Table Skeleton
export function TableSkeleton({
  rows = 5,
  columns = 4,
  variant = 'default',
}: {
  rows?: number
  columns?: number
  variant?: 'default' | 'cyber'
}) {
  return (
    <div
      className={cn(
        'rounded-lg border',
        variant === 'cyber' ? 'border-cyan-500/20' : 'border-border'
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'border-b p-4',
          variant === 'cyber'
            ? 'border-cyan-500/20 bg-gray-900/30'
            : 'border-border bg-muted/50'
        )}
      >
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} variant={variant} className="h-4 flex-1" />
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'p-4',
              variant === 'cyber' ? 'divide-cyan-500/20' : 'divide-border'
            )}
          >
            <div className="flex gap-4">
              {Array.from({ length: columns }).map((_, j) => (
                <Skeleton key={j} variant={variant} className="h-4 flex-1" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Form Skeleton
export function FormSkeleton({
  variant = 'default',
}: {
  variant?: 'default' | 'cyber'
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton variant={variant} className="h-4 w-24" />
        <Skeleton variant={variant} className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton variant={variant} className="h-4 w-32" />
        <Skeleton variant={variant} className="h-24 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton variant={variant} className="h-4 w-20" />
          <Skeleton variant={variant} className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton variant={variant} className="h-4 w-16" />
          <Skeleton variant={variant} className="h-10 w-full" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton variant={variant} className="h-10 w-24" />
        <Skeleton variant={variant} className="h-10 w-20" />
      </div>
    </div>
  )
}

// Page Loading Skeleton
export function PageLoadingSkeleton({
  variant = 'default',
}: {
  variant?: 'default' | 'cyber'
}) {
  return (
    <div className="container mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="space-y-4">
        <Skeleton variant={variant} className="h-8 w-64" />
        <Skeleton variant={variant} className="h-4 w-96" />
      </div>

      {/* Stats */}
      <DashboardStatsSkeleton variant={variant} />

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <SearchResultsSkeleton count={4} variant={variant} />
        </div>
        <div className="space-y-4">
          <ArticleCardSkeleton variant={variant} />
          <ArticleCardSkeleton variant={variant} />
        </div>
      </div>
    </div>
  )
}
