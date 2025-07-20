'use client';

import { useEffect, useState } from 'react';
import { getChallengeById, ChallengeData, getChallengeCategoryImage } from '@/services/challenge.services';

// Importando os novos componentes
import ChallengeHeader from '@/components/challenge-header';
import ChallengeStats from '@/components/challenge-status';
import CheckpointTimeline from '@/components/checkpoint-timeline';
import SupportMaterials from '@/components/suported-materials';
import OngCard from '@/components/ong-card';
import ImpactGallery from '@/components/impact-gallery';
import { useAuth } from '@/hooks/useAuth';
import { NewButton } from '@/components/ui/new-button';
import Link from 'next/link';

// Props que a página recebe, incluindo os parâmetros do URL
interface PageProps {
  params: {
    id: string;
  };
}

export default function ChallengeDetailsOng({ params }: PageProps) {
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Função para buscar os dados do desafio específico
    const fetchChallengeDetails = async () => {
      if (!params.id) return;
      try {
        setLoading(true);
        const data = await getChallengeById(Number(params.id));
        if (data) {
          setChallenge(data);
        } else {
          setError('Desafio não encontrado.');
        }
      } catch (err) {
        setError('Não foi possível carregar os detalhes do desafio.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallengeDetails();
  }, [params.id]); // O efeito é re-executado se o ID mudar

  if (loading) {
    return (
      <div className="text-center p-12">A carregar detalhes do desafio...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-12">{error}</div>;
  }

  if (!challenge) {
    return <div className="text-center p-12">Desafio não encontrado.</div>;
  }

  const isOwner = challenge.ongId === user?.id;

  return (
    <main className="pb-16">
      <ChallengeHeader title={challenge.title} imageUrl={getChallengeCategoryImage(challenge.category)} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="mt-8 text-textBlack">
          <header>
            <div className='flex justify-between items-center'>
              <h1 className="text-3xl font-bold">{challenge.title}</h1>
              {isOwner && (
                <Link href={`/ong/challenges/${params.id}/edit`}>
                  <NewButton size={'lg'}>Editar desafio</NewButton>
                </Link>
              )}
            </div>
            <ChallengeStats
              idealAge={challenge.idealAge}
              endDate={challenge.endDate}
              schoolName={challenge.schoolManager?.schoolName || 'N/A'}
            />
          </header>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Detalhes do desafio</h2>
            <p className="mt-3 text-justify font-light text-lg">
              {challenge.description}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Recursos necessários</h2>
            <p className="mt-3 text-justify font-light text-lg">
              {challenge.neededResources}
            </p>
          </section>

          {challenge.checkpoints && (
            <CheckpointTimeline checkpoints={challenge.checkpoints} />
          )}

          <SupportMaterials urls={challenge.documentUrls} />
          <OngCard ong={challenge.ong} />
          <ImpactGallery checkpoints={challenge.checkpoints} />
        </article>
      </div>
    </main>
  );
}
