'use client';

import ChallengeCard from '@/components/challenge-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { useEffect, useState, useMemo } from 'react';
import { getAllChallenges, ChallengeData, getChallengeCategoryImage } from '@/services/challenge.services'; 

type ChallengesCarouselProps = {
  filter?: {
    ongId?: number;
    managerId?: number;
  }
}

export function ChallengesCarousel({ filter }: ChallengesCarouselProps) {
  const [allChallenges, setAllChallenges] = useState<ChallengeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllChallenges();
        setAllChallenges(data);
      } catch (err) {
        console.error('Falha ao carregar desafios:', err);
        setError(
          'Não foi possível carregar la lista de desafios. Verifique se a API está no ar.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const filteredChallenges = useMemo(() => {
    if (!filter) {
      return allChallenges;
    }

    return allChallenges.filter(challenge => {
      if (filter.ongId && challenge.ongId !== filter.ongId) {
        return false;
      }
      if (filter.managerId && challenge.managerId !== filter.managerId) {
        return false;
      }
      return true;
    });
  }, [allChallenges, filter]);


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

  if (filteredChallenges.length === 0) {
    return (
      <div className='p-8 text-center text-gray-500'>
        <p>Nenhum desafio para exibir no momento.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center px-4 md:px-12">
      <Carousel
        opts={{
          align: 'start'
        }}
        className="w-full h-fit max-w-7xl"
      >
        <CarouselContent >
          {filteredChallenges.map((challenge) => {
            const totalCheckpoints = challenge.checkpoints?.length || 0;
            const completedCheckpoints = challenge.checkpoints?.filter(cp => cp.completionDate).length || 0;
            const progress = totalCheckpoints > 0 ? (completedCheckpoints / totalCheckpoints) * 100 : 0;

            return (
              <CarouselItem key={challenge.id} className="basis-full md:basis-1/2 pl-4">
                <div className="h-full">
                  <ChallengeCard
                    imageSrc={getChallengeCategoryImage(challenge.category)}
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
        <CarouselPrevious className="hidden lg:inline-flex" />
        <CarouselNext className="hidden lg:inline-flex" />
      </Carousel>
    </div>
  );
}