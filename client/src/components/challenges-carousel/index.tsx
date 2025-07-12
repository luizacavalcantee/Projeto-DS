'use client';

import ChallengeCard from '@/components/challenge-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { getAllChallenges, ChallengeData } from '@/services/challenge.services'; 

export function ChallengesCarousel() {
  const [challenges, setChallenges] = useState<ChallengeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllChallenges();
        setChallenges(data);
      } catch (err) {
        console.error('Falha ao carregar desafios:', err);
        setError(
          'Não foi possível carregar a lista de desafios. Verifique se a API está no ar.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) {
    return (
      <div className='p-8 text-center'>
        <p>Carregando desafios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-8 text-red-600 text-center'>
        <p>
          <strong>Erro:</strong> {error}
        </p>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center">
      <Carousel
        opts={{
          align: 'start'
        }}
        className="w-full max-w-6xl h-fit"
      >
        <CarouselContent>
          {challenges.map((challenge) => {
            const totalCheckpoints = challenge.checkpoints?.length || 0;
            const completedCheckpoints = challenge.checkpoints?.filter(cp => cp.completionDate).length || 0;
            const progress = totalCheckpoints > 0 ? (completedCheckpoints / totalCheckpoints) * 100 : 0;

            return (
              <CarouselItem key={challenge.id} className="basis-1/2">
                <div className="p-1 h-full">
                  <ChallengeCard
                    imageSrc={challenge.photoUrl}
                    imageAlt={challenge.title}
                    title={challenge.title}
                    description={challenge.description}
                    progress={progress}
                    id={challenge.id.toString()}
                  />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
