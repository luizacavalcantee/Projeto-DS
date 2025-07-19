'use client';

import Image from 'next/image';
import { CheckpointData } from '@/services/challenge.services';

interface ImpactGalleryProps {
  checkpoints: CheckpointData[] | undefined;
}

export default function ImpactGallery({ checkpoints }: ImpactGalleryProps) {
  // Filtra apenas os checkpoints que têm uma URL de foto
  const checkpointsWithPhotos = checkpoints?.filter(cp => cp.photoUrl);

  if (!checkpointsWithPhotos || checkpointsWithPhotos.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold">Galeria de Impacto</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {checkpointsWithPhotos.map((cp) => (
          <figure key={cp.id}>
            <div className="relative w-full h-64">
              <Image
                src={cp.photoUrl!} // Usamos '!' pois já filtramos os nulos
                alt={`Imagem do ${cp.title}`}
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-md"
              />
            </div>
            <figcaption className="mt-2 text-sm">
              <strong className="text-base">{cp.title}</strong>
              {cp.description && (
                <p className="text-justify text-textGray line-clamp-3">
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
