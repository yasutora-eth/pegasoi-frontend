import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const progressVariants = cva(
  'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      variant: {
        default: '',
        cyber: 'bg-gray-900/50 border border-cyan-400/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 bg-primary transition-all',
  {
    variants: {
      variant: {
        default: '',
        cyber:
          'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_20px_rgba(0,255,255,0.5)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, variant, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ variant, className }))}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressIndicatorVariants({ variant }))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
