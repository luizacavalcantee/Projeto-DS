'use client';

import Image from 'next/image';
import { CheckpointData } from '@/services/challenge.services';

interface ImpactGalleryProps {
  checkpoints: CheckpointData[] | undefined;
}

export default function ImpactGallery({ checkpoints }: ImpactGalleryProps) {

  const checkpointsWithPhotos = checkpoints?.filter((cp) => cp.photoUrl);

  if (!checkpointsWithPhotos || checkpointsWithPhotos.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
        Galeria de Impacto
      </h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-12">
        {' '}
        {checkpointsWithPhotos.map((cp) => (
          <figure key={cp.id}>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl shadow-md">
              <Image
                src={cp.photoUrl!}
                alt={`Imagem do ${cp.title}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <figcaption className="mt-3 text-sm">
              <strong className="text-base">{cp.title}</strong>
              {cp.description && (
                <p className="mt-1 text-left text-textGray line-clamp-3">
                  {cp.description}
                </p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
