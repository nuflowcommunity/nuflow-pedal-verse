
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-nuflow-forest text-white hover:bg-nuflow-darkForest hover:scale-[1.02] hover:shadow-lg focus:bg-nuflow-darkForest focus:scale-[1.02] focus:shadow-lg",
        destructive: "bg-red-500 text-white hover:bg-red-600 hover:scale-[1.02] hover:shadow-lg focus:bg-red-600 focus:scale-[1.02] focus:shadow-lg",
        outline: "bg-white text-nuflow-forest border border-nuflow-forest hover:bg-nuflow-mint hover:scale-[1.02] hover:shadow-lg focus:bg-nuflow-mint focus:scale-[1.02] focus:shadow-lg",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 hover:scale-[1.02] hover:shadow-lg focus:bg-gray-200 focus:scale-[1.02] focus:shadow-lg",
        ghost: "text-nuflow-forest hover:bg-nuflow-mint/50 hover:scale-[1.02] focus:bg-nuflow-mint/50 focus:scale-[1.02]",
        link: "text-nuflow-forest underline-offset-4 hover:underline hover:scale-[1.02] focus:scale-[1.02]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
