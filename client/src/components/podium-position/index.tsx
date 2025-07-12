'use client';

import Image, { StaticImageData } from 'next/image';
import { School } from '@/assets';

interface PodiumPositionProps {
  schoolName: string;
  schoolImage: string | StaticImageData | null;
  podiumIcon: StaticImageData;
  podiumIconAlt: string;
  barHeightClass: string; // ex: 'h-52'
}

export default function PodiumPosition({ schoolName, schoolImage, podiumIcon, podiumIconAlt, barHeightClass }: PodiumPositionProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-32">
        <Image
          src={School}
          alt={schoolName}
          className="w-32 h-32 rounded-full drop-shadow-lg border border-lightBlueRanking/20 object-cover"
        />
        <h1 className="absolute bottom-0 w-full bg-darkBlueRanking text-white p-1 text-xs font-semibold rounded text-center transform translate-y-1/3">
          {schoolName}
        </h1>
      </div>
      <div className={`bg-lightBlueRanking w-full rounded-lg py-3 px-8 flex items-start justify-center ${barHeightClass}`}>
        <Image src={podiumIcon} alt={podiumIconAlt} className="w-16" />
      </div>
    </div>
  );
}
