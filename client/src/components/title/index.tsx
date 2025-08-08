'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BoraImpactar } from '@/assets';
import { ChevronLeft } from 'lucide-react';

interface TitleProps {
  pageTitle: string;
}

export default function Title({ pageTitle }: TitleProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    
    <div className="w-full flex items-center justify-between pt-8 md:pt-10 lg:pt-12 bg-transparent px-4 md:px-12 lg:px-16">
      
      <div className="flex items-center gap-2 md:gap-4">
        <button onClick={handleBack} className="flex items-center">
          <ChevronLeft
            className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" strokeWidth={2}
          />
        </button>
        
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black whitespace-nowrap">
          {pageTitle}
        </h1>
      </div>
    
      <div className="hidden md:block md:h-10 lg:h-16 w-fit">
        <Image
          src={BoraImpactar}
          alt="Bora Impactar"
          className="h-full w-fit object-contain"
        />
      </div>
    </div>
  );
}