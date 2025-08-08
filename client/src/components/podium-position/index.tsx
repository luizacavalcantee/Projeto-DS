'use client';

import { School } from '@/assets';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { StaticImageData } from 'next/image';

interface PodiumPositionProps {
  schoolName: string;
  schoolImage: string | StaticImport | null;
  podiumIcon: StaticImageData;
  podiumIconAlt: string;
  barHeightClass: string;
}

export default function PodiumPosition({ schoolName, schoolImage, podiumIcon, podiumIconAlt, barHeightClass }: PodiumPositionProps) {
  return (
    <div className="flex flex-col items-center gap-3 md:gap-6">
      <div className="relative w-20 md:w-32">
          <Image
            src={schoolImage ?? School}
            alt={schoolName}
            width={128}
            height={128}
            className="w-20 h-20 md:w-32 md:h-32 rounded-full drop-shadow-lg border border-lightBlueRanking/20 object-cover"
          />
        <h1 className="absolute bottom-0 w-full bg-darkBlueRanking text-white p-1 text-xs font-semibold rounded text-center truncate md:whitespace-normal transform translate-y-1/3">
          {schoolName}
        </h1>
      </div>
      <div className={`bg-lightBlueRanking w-full rounded-lg py-2 px-4 md:py-3 md:px-8 flex items-start justify-center ${barHeightClass}`}>
        <Image src={podiumIcon} alt={podiumIconAlt} className="w-10 md:w-16" />
      </div>
    </div>
  );
}