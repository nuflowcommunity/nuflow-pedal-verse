
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trailflow-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-center relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-trailflow-green text-gray-900 border border-trailflow-green-dark/20 hover:bg-trailflow-green-dark hover:shadow-xl hover:scale-[1.02] focus:bg-trailflow-green-dark active:scale-[0.98] font-semibold",
        destructive: "bg-red-500 text-gray-900 border border-red-600/20 hover:bg-red-600 hover:shadow-xl hover:scale-[1.02] focus:bg-red-600 active:scale-[0.98] font-semibold",
        outline: "border-2 border-trailflow-green bg-white/95 text-gray-800 backdrop-blur-sm hover:bg-trailflow-green hover:text-gray-900 hover:shadow-lg hover:scale-[1.02] focus:bg-trailflow-green focus:text-gray-900 active:scale-[0.98] font-semibold",
        secondary: "bg-gray-100/95 text-gray-800 border border-gray-200 backdrop-blur-sm hover:bg-gray-200 hover:shadow-lg hover:scale-[1.02] focus:bg-gray-200 active:scale-[0.98] font-semibold",
        ghost: "text-gray-800 hover:bg-gray-100/95 hover:text-gray-900 hover:scale-[1.02] focus:bg-gray-100 active:scale-[0.98] font-semibold",
        link: "text-trailflow-green underline-offset-4 hover:underline hover:text-trailflow-green-dark hover:scale-[1.02] focus:scale-[1.02] active:scale-[0.98] font-semibold",
        accent: "bg-trailflow-accent/95 text-gray-800 border border-trailflow-accent-dark/20 backdrop-blur-sm hover:bg-trailflow-accent hover:shadow-lg hover:scale-[1.02] focus:bg-trailflow-accent active:scale-[0.98] font-semibold",
        minimal: "bg-white/95 text-gray-800 border border-gray-200 backdrop-blur-sm hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02] focus:bg-gray-50 active:scale-[0.98] font-semibold",
        dark: "bg-trailflow-dark/95 text-gray-100 border border-trailflow-dark backdrop-blur-sm hover:bg-trailflow-medium hover:shadow-xl hover:scale-[1.02] focus:bg-trailflow-medium active:scale-[0.98] font-semibold",
        success: "bg-green-500 text-gray-900 border border-green-600/20 hover:bg-green-600 hover:shadow-xl hover:scale-[1.02] focus:bg-green-600 active:scale-[0.98] font-semibold",
        warning: "bg-yellow-500 text-gray-900 border border-yellow-600/20 hover:bg-yellow-600 hover:shadow-xl hover:scale-[1.02] focus:bg-yellow-600 active:scale-[0.98] font-semibold",
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
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <span className={cn("transition-opacity duration-200", loading && "opacity-0")}>
          {children}
        </span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
