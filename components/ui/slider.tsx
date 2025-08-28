import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const sliderVariants = cva(
  'relative flex w-full touch-none select-none items-center',
  {
    variants: {
      variant: {
        default: '',
        cyber: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const sliderTrackVariants = cva(
  'relative h-2 w-full grow overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      variant: {
        default: '',
        cyber: 'bg-gray-800 border border-cyan-400/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const sliderRangeVariants = cva('absolute h-full bg-primary', {
  variants: {
    variant: {
      default: '',
      cyber:
        'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_10px_rgba(0,255,255,0.5)]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const sliderThumbVariants = cva(
  'block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        cyber:
          'border-cyan-400 bg-white shadow-[0_0_15px_rgba(0,255,255,0.4)] focus-visible:ring-cyan-400/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderVariants> {}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, variant, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(sliderVariants({ variant, className }))}
    {...props}
  >
    <SliderPrimitive.Track className={cn(sliderTrackVariants({ variant }))}>
      <SliderPrimitive.Range className={cn(sliderRangeVariants({ variant }))} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cn(sliderThumbVariants({ variant }))} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
