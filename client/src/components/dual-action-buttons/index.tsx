import Link from 'next/link';
import { NewButton } from '../ui/new-button';
import React from 'react';

interface DualActionButtonsProps {
  left: {
    text: string;
    href: string;
    variant?: 'default' | 'white';
  };
  right: {
    text: string;
    href: string;
    variant?: 'default' | 'white';
  };
  className?: string;
}

export const DualActionButtons: React.FC<DualActionButtonsProps> = ({ left, right, className }) => (
  <div className={`flex gap-4 ${className || ''}`}>
    <Link href={left.href}>
      <NewButton className="w-fit px-10 py-3" variant={left.variant || 'default'}>{left.text}</NewButton>
    </Link>
    <Link href={right.href}>
      <NewButton className="w-fit px-10 py-3" variant={right.variant || 'white'}>{right.text}</NewButton>
    </Link>
  </div>
); 