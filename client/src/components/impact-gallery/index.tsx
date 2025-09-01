'use client';

import { CheckpointData } from '@/services/challenge.services';
// Comentário: A importação de 'Image' e 'School' não é mais necessária, pois não haverá imagens.
// import Image from 'next/image';
// import { School } from '@/assets';

interface ImpactGalleryProps {
  checkpoints: CheckpointData[] | undefined;
}

export default function ImpactGallery({ checkpoints }: ImpactGalleryProps) {
  if (!checkpoints || checkpoints.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
        Feedback dos checkpoints
      </h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-12">
        {checkpoints.map((cp) => (
          // Comentário: O elemento <figure> foi substituído por uma div simples
          // para organizar o conteúdo textual, já que não há mais uma figura (imagem)
          // para agrupar.
          <div key={cp.id}>
            {/* Comentário: Todo o bloco abaixo, responsável pela exibição da imagem,
            foi removido. 
            
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl shadow-md">
              <Image
                src={cp.photoUrl || School}
                alt={`Imagem do ${cp.title}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div> 
            */}
            
            <div className="mt-3 text-sm">
              <strong className="text-base">{cp.title}</strong>
              {cp.description && (
                <p className="mt-1 text-left text-textGray line-clamp-3">
                  {cp.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}