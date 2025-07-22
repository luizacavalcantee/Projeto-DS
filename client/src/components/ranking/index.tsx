'use client';

import { useEffect, useState } from 'react';
import { Second, Third, Trophy } from '@/assets';
import PodiumPosition from '@/components/podium-position';
import { getSchoolRanking, RankedSchool } from '@/services/ranking.services';

export default function Ranking() {
  const [topSchools, setTopSchools] = useState<RankedSchool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const rankingData = await getSchoolRanking();
        setTopSchools(rankingData.slice(0, 3));
      } catch (err) {
        setError("Não foi possível carregar o ranking.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Carregando ranking...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-10">{error}</div>;
  }
  
  if (topSchools.length === 0) {
    return <div className="text-center p-10">Nenhuma escola no ranking ainda.</div>;
  }

  const firstPlace = topSchools[0];
  const secondPlace = topSchools[1];
  const thirdPlace = topSchools[2];

  return (
    <div className="flex gap-10 items-end justify-center">
      {secondPlace && (
        <PodiumPosition
          schoolName={secondPlace.schoolName}
          schoolImage={secondPlace.schoolImageUrl}
          podiumIcon={Second}
          podiumIconAlt="2º Lugar"
          barHeightClass="h-52"
        />
      )}

      {firstPlace && (
        <PodiumPosition
          schoolName={firstPlace.schoolName}
          schoolImage={firstPlace.schoolImageUrl}
          podiumIcon={Trophy}
          podiumIconAlt="1º Lugar"
          barHeightClass="h-60"
        />
      )}

      {thirdPlace && (
        <PodiumPosition
          schoolName={thirdPlace.schoolName}
          schoolImage={thirdPlace.schoolImageUrl}
          podiumIcon={Third}
          podiumIconAlt="3º Lugar"
          barHeightClass="h-[11.25rem]"
        />
      )}
    </div>
  );
}
