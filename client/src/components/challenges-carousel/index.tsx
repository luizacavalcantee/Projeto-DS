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

// 1. Definindo o tipo para a prop de filtro
// Podemos filtrar por ONG (ongId) ou por Escola (managerId)
type ChallengesCarouselProps = {
  filter?: {
    ongId?: number;
    managerId?: number;
  }
}

export function ChallengesCarousel({ filter }: ChallengesCarouselProps) {
  // Estado para armazenar TODOS os desafios buscados da API
  const [allChallenges, setAllChallenges] = useState<ChallengeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        setError(null);
        // A busca continua a mesma: pegamos todos os desafios uma única vez.
        const data = await getAllChallenges();
        setAllChallenges(data);
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

  // 2. Lógica de filtragem usando useMemo para performance
  // O carrossel agora exibirá apenas os desafios que passam pelo filtro.
  const filteredChallenges = useMemo(() => {
    if (!filter) {
      // Se nenhum filtro for fornecido, retorna todos os desafios.
      return allChallenges;
    }

    return allChallenges.filter(challenge => {
      // Se um ongId for fornecido, verifica se o ID da ONG do desafio corresponde.
      if (filter.ongId && challenge.ongId !== filter.ongId) {
        return false;
      }
      // Se um managerId for fornecido, verifica se o ID do gestor do desafio corresponde.
      if (filter.managerId && challenge.managerId !== filter.managerId) {
        return false;
      }
      // Se passar por todas as verificações, o desafio é incluído.
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

  // Adicionado um estado para quando não há desafios a serem exibidos após o filtro
  if (filteredChallenges.length === 0) {
    return (
      <div className='p-8 text-center text-gray-500'>
        <p>Nenhum desafio para exibir no momento.</p>
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
          {/* 3. Mapeia a lista JÁ FILTRADA */}
          {filteredChallenges.map((challenge) => {
            const totalCheckpoints = challenge.checkpoints?.length || 0;
            const completedCheckpoints = challenge.checkpoints?.filter(cp => cp.completionDate).length || 0;
            const progress = totalCheckpoints > 0 ? (completedCheckpoints / totalCheckpoints) * 100 : 0;

            return (
              <CarouselItem key={challenge.id} className="basis-1/2">
                <div className="p-1 h-full">
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
