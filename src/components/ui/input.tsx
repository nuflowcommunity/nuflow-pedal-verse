
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-white/40 bg-white/60 backdrop-blur-sm px-4 py-3 text-base text-gray-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trailflow-green focus-visible:ring-offset-2 focus-visible:border-trailflow-green focus-visible:bg-white/80 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/70 hover:border-gray-400 transition-all duration-200 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
