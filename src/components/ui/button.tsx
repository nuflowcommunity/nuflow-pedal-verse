
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trailflow-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-trailflow-lighter text-trailflow-dark hover:bg-trailflow-light hover:shadow-lg hover:scale-[1.02] focus:bg-trailflow-light active:scale-[0.98]",
        destructive: "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:scale-[1.02] focus:bg-red-600 active:scale-[0.98]",
        outline: "border-2 border-trailflow-lighter bg-transparent text-trailflow-dark hover:bg-trailflow-lighter hover:shadow-md hover:scale-[1.02] focus:bg-trailflow-lighter active:scale-[0.98]",
        secondary: "bg-trailflow-light text-trailflow-dark hover:bg-trailflow-lighter hover:shadow-md hover:scale-[1.02] focus:bg-trailflow-lighter active:scale-[0.98]",
        ghost: "text-trailflow-medium hover:bg-trailflow-accent hover:text-trailflow-dark hover:scale-[1.02] focus:bg-trailflow-accent active:scale-[0.98]",
        link: "text-trailflow-medium underline-offset-4 hover:underline hover:text-trailflow-green hover:scale-[1.02] focus:scale-[1.02] active:scale-[0.98]",
        accent: "bg-trailflow-green text-white hover:bg-trailflow-green-dark hover:shadow-lg hover:scale-[1.02] focus:bg-trailflow-green-dark active:scale-[0.98]",
        minimal: "bg-white/80 backdrop-blur-sm text-trailflow-dark hover:bg-white hover:shadow-md hover:scale-[1.02] focus:bg-white active:scale-[0.98]",
        overlay: "bg-white/20 backdrop-blur-md text-trailflow-dark hover:bg-white/30 hover:shadow-lg hover:scale-[1.02] focus:bg-white/30 active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-8 py-2.5",
        sm: "h-9 rounded-full px-6 text-xs",
        lg: "h-12 rounded-full px-10 text-base",
        xl: "h-14 rounded-full px-12 text-lg",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
