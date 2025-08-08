'use client';

import ChallengeCard from '@/components/challenge-card';
import { ChallengeData, getChallengeCategoryImage } from '@/services/challenge.services';

interface ChallengeGridProps {
  challenges: ChallengeData[];
}

export default function ChallengeGrid({ challenges }: ChallengeGridProps) {
  const calculateProgress = (challenge: ChallengeData) => {
    const totalCheckpoints = challenge.checkpoints?.length || 0;
    if (totalCheckpoints === 0) return 0;
    const completedCheckpoints = challenge.checkpoints?.filter(cp => cp.completionDate).length || 0;
    return (completedCheckpoints / totalCheckpoints) * 100;
  };

  return (
    <div>
      <hr className="my-8 border-gray-300" />
      {challenges.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center w-full">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              id={challenge.id.toString()}
              imageSrc={getChallengeCategoryImage(challenge.category)}
              imageAlt={challenge.title}
              title={challenge.title}
              description={challenge.description}
              progress={calculateProgress(challenge)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">Nenhum desafio encontrado com os filtros selecionados.</p>
      )}
    </div>
  );
}
