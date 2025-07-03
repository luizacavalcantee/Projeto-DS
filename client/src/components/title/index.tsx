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
    <div className="w-full flex items-center justify-between px-16 pt-20 bg-transparent">
      <div className="flex items-center gap-4">
        <button onClick={handleBack}>
          <ChevronLeft size={32}/>
        </button>
        <h1 className="text-[32px] font-semibold text-black">
          {pageTitle}
        </h1>
      </div>
      <div className="h-[67px] w-auto">
        <Image
          src={BoraImpactar}
          alt="Bora Impactar"
          className="h-16 object-contain"
        />
      </div>
    </div>
  );
}
