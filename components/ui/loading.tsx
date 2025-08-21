import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const loadingVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'text-primary',
        cyber: 'text-cyan-400',
      },
      size: {
        sm: 'h-4 w-4',
        default: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(loadingVariants({ variant, size, className }))}
      {...props}
    >
      <svg
        className="animate-spin"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
)
LoadingSpinner.displayName = 'LoadingSpinner'

export interface LoadingStateProps {
  variant?: 'default' | 'cyber'
  size?: 'sm' | 'default' | 'lg' | 'xl'
  message?: string
  className?: string
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  variant = 'default', 
  size = 'default', 
  message = 'Loading...', 
  className 
}) => (
  <div className={cn('flex flex-col items-center justify-center gap-4 p-8', className)}>
    <LoadingSpinner variant={variant} size={size} />
    <p className={cn(
      'text-sm font-medium',
      variant === 'cyber' ? 'text-cyan-300' : 'text-muted-foreground'
    )}>
      {message}
    </p>
  </div>
)

export interface CyberLoadingProps {
  message?: string
  className?: string
}

const CyberLoading: React.FC<CyberLoadingProps> = ({ 
  message = 'INITIALIZING SYSTEMS...', 
  className 
}) => (
  <div className={cn('flex flex-col items-center justify-center gap-6 p-12', className)}>
    <div className="relative">
      <LoadingSpinner variant="cyber" size="xl" />
      <div className="absolute inset-0 animate-ping">
        <LoadingSpinner variant="cyber" size="xl" className="opacity-20" />
      </div>
    </div>
    <div className="text-center space-y-2">
      <p className="text-cyber text-glow text-lg font-bold uppercase tracking-wider">
        {message}
      </p>
      <div className="data-stream w-32 h-1 mx-auto" />
    </div>
  </div>
)

export { LoadingSpinner, LoadingState, CyberLoading }