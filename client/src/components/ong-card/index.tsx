'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, BoraImpactar } from '@/assets';
import { OngData } from '@/services/ong.services';

interface OngCardProps {
  ong: OngData | undefined;
}

export default function OngCard({ ong }: OngCardProps) {
  if (!ong) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold">ONG Responsável</h2>
      <div className="mt-4 bg-white/60 p-6 rounded-lg shadow flex flex-col md:flex-row items-center gap-6">
        <div className='w-48 h-48 flex-shrink-0'>
          <Image
            src={ong.logoPhotoUrl || BoraImpactar }
            alt={`Logo da ONG ${ong.name}`}
            width={192}
            height={192}
            className="rounded-md object-contain w-full h-full"
          />
        </div>
        <div className='w-full'>
          <h3 className="text-xl font-bold">{ong.name}</h3>
          <p className="mt-2 text-justify">{ong.description}</p>
          <div className='flex flex-col sm:flex-row justify-between sm:items-end mt-4'>
            <address className="flex flex-col gap-y-1 not-italic">
              {ong.contactPhone && (
                <a href={`tel:${ong.contactPhone}`} className="hover:underline">
                  {ong.contactPhone}
                </a>
              )}
              <a href={`mailto:${ong.email}`} className="hover:underline">
                {ong.email}
              </a>
            </address>
            <div className="mt-4 sm:mt-0 flex items-end gap-x-4">
              {ong.facebookLink && (
                <Link href={ong.facebookLink} target="_blank" rel="noopener noreferrer">
                  <Image src={Facebook} alt="Logo do Facebook" className="h-6 w-6" />
                </Link>
              )}
              {ong.instagramLink && (
                <Link href={ong.instagramLink} target="_blank" rel="noopener noreferrer">
                  <Image src={Instagram} alt="Logo do Instagram" className="h-6 w-6" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
