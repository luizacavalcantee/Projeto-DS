import * as React from "react"

import { cn } from "@/lib/utils"

const NewInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "font-dmSans flex h-10 w-full rounded border border-gray-300 bg-white/60 px-3 py-2 text-base placeholder:text-base placeholder:font-dmSans placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-primary focus:border-[1.5px] hover:border-gray-600",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
NewInput.displayName = "Input"

export { NewInput }
