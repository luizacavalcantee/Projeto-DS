'use client';

import Title from '@/components/title';
import ChallengeFilters from '@/components/challenge-filter';
import ChallengeGrid from '@/components/challenge-grid';
import ChallengePagination from '@/components/challenge-pagination';
import { useChallenges } from '@/hooks/useChallenges';
import { useAuth } from '@/hooks/useAuth';

export default function ManagerMyChallengesPage() {
  const { user, loading: authLoading } = useAuth();

  const {
    loading: challengesLoading,
    error,
    currentChallenges,
    filterOptions,
    filters,
    setFilters,
    pagination
  } = useChallenges(
    user?.type === 'manager' ? { managerId: user.id } : undefined
  );

  const loading = authLoading || challengesLoading;

  const cleanFilterOptions = {
    ...filterOptions,
    ongs: filterOptions.ongs.filter(Boolean) as string[],
    schools: filterOptions.schools.filter(Boolean) as string[],
  };

  if (loading) {
    return (
      <div className="p-8 text-center min-h-screen">A carregar os seus desafios...</div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-600 text-center min-h-screen">
        <strong>Erro:</strong> {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Title pageTitle="Meus desafios" />
        <div className="container mx-auto px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Acompanhe os desafios da sua escola
            </h2>
            <p className="text-gray-600 mb-8">
              Aqui você pode ver e filtrar todos os desafios em que a sua escola está a participar. Acompanhe o progresso e o impacto gerado!
            </p>
          </div>
          
          <ChallengeFilters
            filterOptions={cleanFilterOptions}
            filters={filters}
            setFilters={setFilters}
            hideFilters={['school']}
          />

          <ChallengeGrid challenges={currentChallenges} />

          <ChallengePagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            setCurrentPage={pagination.setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
}
