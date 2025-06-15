
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-gray-300/60 bg-gray-100/80 backdrop-blur-sm px-4 py-3 text-base text-gray-900 ring-offset-white placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trailflow-green focus-visible:ring-offset-2 focus-visible:border-trailflow-green focus-visible:bg-gray-50/90 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50/85 hover:border-gray-400 transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
