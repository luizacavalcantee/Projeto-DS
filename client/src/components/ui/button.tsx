import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'utils';

const buttonVariants = cva(
  'flex items-center justify-center whitespace-nowrap rounded-md',
  {
    variants: {
      variant: {
        default:
          'bg-[#294BB6] text-white shadow hover:bg-[#2644a6] hover:drop-shadow-lg',
        white:
          'bg-white border-2 border-[#294BB6] text-[#294BB6] shadow hover:drop-shadow-lg hover:bg-[#fafafa]',
        transparent:
          'bg-transparent text-white',
      },
      size: {
        default: 'py-3 px-5 min-w-64',
        sm: 'py-2 px-4 min-w-28',
        lg: 'p-5 min-w-56',
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
Button.displayName = 'Button';

export { Button, buttonVariants };