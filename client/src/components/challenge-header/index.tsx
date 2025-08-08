'use client';
import Image from 'next/image';
import Title from '@/components/title';

interface ChallengeHeaderProps {
  title: string;
  imageUrl: string;
}

export default function ChallengeHeader({
  title,
  imageUrl
}: ChallengeHeaderProps) {
  return (
    <>
      <Title pageTitle="Detalhes do desafio" />
      <div className='px-4 md:px-12 lg:px-16'>
        <div className="w-full h-48 md:h-64 relative rounded-xl overflow-hidden shadow-lg mt-10">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
        </div>
      </div>
    </>
  );
}
