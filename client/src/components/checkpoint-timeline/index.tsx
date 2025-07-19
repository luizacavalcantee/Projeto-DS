'use client';
import Image from 'next/image';
import { Check } from '@/assets';
import { CheckpointData } from '@/services/challenge.services';

interface CheckpointTimelineProps {
  checkpoints: CheckpointData[];
}

export default function CheckpointTimeline({ checkpoints }: CheckpointTimelineProps) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold">Metas e Checkpoints</h2>
      <ul className="mt-6">
        {checkpoints.map((cp, index) => (
          <li key={cp.id} className="flex h-16">
            <div className="flex flex-col items-center mr-4 pt-2 gap-1">
              <div>
                <div className="flex items-center justify-center w-2 h-2 bg-black rounded-full"></div>
              </div>
              {/* Não mostra a linha no último item */}
              {index < checkpoints.length - 1 && (
                <div className="w-px h-full border-l border-gray-300"></div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <h3 className="font-medium">{cp.title}</h3>
                {cp.completionDate && (
                  <Image src={Check} alt="Concluído" className="ml-2 h-4 w-4" />
                )}
              </div>
              <p className="text-sm text-textGray">
                {cp.completionDate 
                  ? `Concluído em: ${new Date(cp.completionDate).toLocaleDateString('pt-BR')}`
                  : 'Pendente'
                }
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
