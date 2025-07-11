import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex items-center justify-center whitespace-nowrap rounded-md',
  {
    variants: {
      variant: {
        default:
          'bg-secondary font-semibold text-white shadow hover:bg-secondaryHover hover:drop-shadow',
        white:
          'bg-white border-2 border-secondary text-secondary hover:drop-shadow-md hover:bg-[#fafafa]',
        transparent:
          'bg-transparent text-white',
        lightBlue:
          'bg-primary font-medium text-white shadow hover:bg-primaryHover hover:drop-shadow',
      },
      size: {
        default: 'py-4 px-5',
        sm: 'py-2 px-4 min-w-28',
        lg: 'px-5 py-3 min-w-56',
        fit: 'p-2 w-full',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const NewButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
NewButton.displayName = 'Button';

export { NewButton, buttonVariants };