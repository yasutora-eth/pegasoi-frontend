import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const separatorVariants = cva('shrink-0 bg-border', {
  variants: {
    variant: {
      default: '',
      cyber: 'bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent',
    },
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    orientation: 'horizontal',
  },
})

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    VariantProps<typeof separatorVariants> {}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = 'horizontal',
      variant,
      decorative = true,
      ...props
    },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ variant, orientation, className }))}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
