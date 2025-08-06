'use client';

import { useEffect, useState } from 'react';
import {
  getChallengeById,
  ChallengeData,
  getChallengeCategoryImage,
  assignManagerToChallenge,
} from '@/services/challenge.services';

import ChallengeHeader from '@/components/challenge-header';
import ChallengeStats from '@/components/challenge-status';
import CheckpointTimeline from '@/components/checkpoint-timeline';
import SupportMaterials from '@/components/suported-materials';
import OngCard from '@/components/ong-card';
import ImpactGallery from '@/components/impact-gallery';
import { useAuth } from '@/hooks/useAuth';
import { NewButton } from '@/components/ui/new-button';
import CheckpointModal from '@/components/checkpoint-modal';

interface PageProps {
  params: { id: string };
}

export default function ChallengeDetailsManager({ params }: PageProps) {
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const { user } = useAuth();

  const fetchChallengeDetails = async () => {
    if (!params.id) return;
    try {
      if (!challenge) setLoading(true);
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

  useEffect(() => {
    fetchChallengeDetails();
  }, [params.id]);

  const handleParticipate = async () => {
    if (!user?.id || !challenge?.id) {
      setError('Usuário ou desafio não identificado. Por favor, faça login novamente.');
      return;
    }

    setIsJoining(true);
    setError(null);

    try {
      await assignManagerToChallenge(challenge.id, user.id);

      await fetchChallengeDetails();
    } catch (err) {
      console.error('Erro ao participar do desafio:', err);
      setError('Não foi possível se registrar no desafio. Tente novamente mais tarde.');
    } finally {
      setIsJoining(false);
    }
  };

  if (loading) return <div className="text-center p-12">A carregar...</div>;
  if (error) return <div className="text-center text-red-500 p-12">{error}</div>;
  if (!challenge) return <div className="text-center p-12">Desafio não encontrado.</div>;

  const hasAnOwner = challenge.managerId != null;
  const isOwner = challenge.managerId === user?.id;

  const nextCheckpointToUpdate = challenge.checkpoints?.find(
    (cp) => !cp.completionDate
  );

  return (
    <main className="pb-16">
      <ChallengeHeader title={challenge.title} imageUrl={getChallengeCategoryImage(challenge.category)} />

      <div className="mx-auto px-4 md:px-12 lg:px-16">
        <article className="mt-8 text-textBlack">
          <header>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{challenge.title}</h1>

              {!hasAnOwner && (
                <NewButton
                  size={'lg'}
                  onClick={handleParticipate}
                  disabled={isJoining}
                >
                  {isJoining ? 'Aguarde...' : 'Participar do desafio'}
                </NewButton>
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
            <div className="mt-10">
              <CheckpointTimeline checkpoints={challenge.checkpoints} />

              {isOwner && nextCheckpointToUpdate && (
                <div className="text-center">
                  <CheckpointModal
                    checkpoint={nextCheckpointToUpdate}
                    onUpdateSuccess={fetchChallengeDetails}
                  />
                </div>
              )}
            </div>
          )}

          <SupportMaterials urls={challenge.documentUrls} />
          <OngCard ong={challenge.ong} />
          <ImpactGallery checkpoints={challenge.checkpoints} />
        </article>
      </div>
    </main>
  );
}