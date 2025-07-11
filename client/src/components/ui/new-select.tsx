"use client"

import * as React from "react"
import * as NewSelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const NewSelect = NewSelectPrimitive.Root

const NewSelectGroup = NewSelectPrimitive.Group

const NewSelectValue = NewSelectPrimitive.Value

const NewSelectTrigger = React.forwardRef<
  React.ElementRef<typeof NewSelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NewSelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NewSelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between border font-dmSans rounded border-gray-300 bg-white/60 px-3 py-2 text-base placeholder:text-base placeholder:font-dmSans placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-primary focus:border-[1.5px] hover:border-gray-600 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <NewSelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </NewSelectPrimitive.Icon>
  </NewSelectPrimitive.Trigger>
))
NewSelectTrigger.displayName = NewSelectPrimitive.Trigger.displayName

const NewSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof NewSelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof NewSelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <NewSelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </NewSelectPrimitive.ScrollUpButton>
))
NewSelectScrollUpButton.displayName = NewSelectPrimitive.ScrollUpButton.displayName

const NewSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof NewSelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof NewSelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <NewSelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </NewSelectPrimitive.ScrollDownButton>
))
NewSelectScrollDownButton.displayName =
  NewSelectPrimitive.ScrollDownButton.displayName

const NewSelectContent = React.forwardRef<
  React.ElementRef<typeof NewSelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NewSelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <NewSelectPrimitive.Portal>
    <NewSelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-Newselect-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-Newselect-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <NewSelectScrollUpButton />
      <NewSelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-Newselect-trigger-height)] w-full min-w-[var(--radix-Newselect-trigger-width)]"
        )}
      >
        {children}
      </NewSelectPrimitive.Viewport>
      <NewSelectScrollDownButton />
    </NewSelectPrimitive.Content>
  </NewSelectPrimitive.Portal>
))
NewSelectContent.displayName = NewSelectPrimitive.Content.displayName

const NewSelectLabel = React.forwardRef<
  React.ElementRef<typeof NewSelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof NewSelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <NewSelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
NewSelectLabel.displayName = NewSelectPrimitive.Label.displayName

const NewSelectItem = React.forwardRef<
  React.ElementRef<typeof NewSelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof NewSelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <NewSelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default Newselect-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <NewSelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </NewSelectPrimitive.ItemIndicator>
    </span>

    <NewSelectPrimitive.ItemText>{children}</NewSelectPrimitive.ItemText>
  </NewSelectPrimitive.Item>
))
NewSelectItem.displayName = NewSelectPrimitive.Item.displayName

const NewSelectSeparator = React.forwardRef<
  React.ElementRef<typeof NewSelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof NewSelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <NewSelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
NewSelectSeparator.displayName = NewSelectPrimitive.Separator.displayName

export {
  NewSelect,
  NewSelectGroup,
  NewSelectValue,
  NewSelectTrigger,
  NewSelectContent,
  NewSelectLabel,
  NewSelectItem,
  NewSelectSeparator,
  NewSelectScrollUpButton,
  NewSelectScrollDownButton,
}
