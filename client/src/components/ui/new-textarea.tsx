import * as React from "react"

import { cn } from "@/lib/utils"

const NewTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] font-dmSans h-10 w-full rounded border border-gray-300 bg-white/60 px-3 py-2 text-base placeholder:text-base placeholder:font-dmSans placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-primary focus:border-[1.5px] hover:border-gray-600",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
NewTextarea.displayName = "Textarea"

export { NewTextarea }
