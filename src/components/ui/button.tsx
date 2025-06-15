
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trailflow-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-center",
  {
    variants: {
      variant: {
        default: "bg-trailflow-green text-gray-800 hover:bg-trailflow-green-dark hover:shadow-xl hover:scale-[1.02] focus:bg-trailflow-green-dark active:scale-[0.98] font-medium",
        destructive: "bg-red-500 text-gray-800 hover:bg-red-600 hover:shadow-xl hover:scale-[1.02] focus:bg-red-600 active:scale-[0.98] font-medium",
        outline: "border-2 border-trailflow-green bg-white text-gray-700 hover:bg-trailflow-green hover:text-gray-800 hover:shadow-lg hover:scale-[1.02] focus:bg-trailflow-green focus:text-gray-800 active:scale-[0.98] font-medium",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-lg hover:scale-[1.02] focus:bg-gray-200 active:scale-[0.98] font-medium",
        ghost: "text-gray-800 hover:bg-gray-100 hover:text-gray-900 hover:scale-[1.02] focus:bg-gray-100 active:scale-[0.98] font-medium",
        link: "text-trailflow-green underline-offset-4 hover:underline hover:text-trailflow-green-dark hover:scale-[1.02] focus:scale-[1.02] active:scale-[0.98] font-medium",
        accent: "bg-trailflow-accent text-gray-800 hover:bg-trailflow-accent/80 hover:shadow-lg hover:scale-[1.02] focus:bg-trailflow-accent/80 active:scale-[0.98] font-medium",
        minimal: "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02] focus:bg-gray-50 active:scale-[0.98] font-medium",
        dark: "bg-trailflow-dark text-gray-300 hover:bg-trailflow-medium hover:shadow-xl hover:scale-[1.02] focus:bg-trailflow-medium active:scale-[0.98] font-medium",
      },
      size: {
        default: "h-11 px-6 py-2.5 min-w-[120px]",
        sm: "h-9 rounded-md px-4 text-xs min-w-[100px]",
        lg: "h-12 rounded-lg px-8 text-base min-w-[140px]",
        xl: "h-14 rounded-lg px-10 text-lg min-w-[160px]",
        icon: "h-11 w-11 rounded-lg min-w-[44px]",
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
