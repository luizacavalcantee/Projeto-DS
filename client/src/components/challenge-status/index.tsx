'use client';
import { TeachingStage } from '@/services/schoolManager.services';

interface ChallengeStatsProps {
  idealAge: TeachingStage[];
  endDate: string;
  schoolName: string;
}

export default function ChallengeStats({ idealAge, endDate, schoolName }: ChallengeStatsProps) {
  const formattedDate = new Date(endDate).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
  
  const ageMap: Record<TeachingStage, string> = {
    [TeachingStage.EDUCACAO_INFANTIL]: "Educação Infantil",
    [TeachingStage.ENSINO_FUNDAMENTAL_I]: "Fundamental I",
    [TeachingStage.ENSINO_FUNDAMENTAL_II]: "Fundamental II",
    [TeachingStage.ENSINO_MEDIO]: "Ensino Médio",
  };
  const formattedAges = idealAge.map(age => ageMap[age]).join(', ');

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div className="bg-detailsBackground p-6 rounded-xl">
        <p className="text-base font-medium">Idade ideal</p>
        <p className="text-2xl font-bold">{formattedAges}</p>
      </div>
      <div className="bg-detailsBackground p-6 rounded-xl">
        <p className="text-base font-medium">Data de término</p>
        <p className="text-2xl font-bold">{formattedDate}</p>
      </div>
      <div className="bg-detailsBackground p-6 rounded-xl">
        <p className="text-base font-medium">Escola participante</p>
        <p className="text-2xl font-bold truncate">{schoolName}</p>
      </div>
    </div>
  );
}
