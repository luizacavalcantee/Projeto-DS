'use client';

import Title from '@/components/title';
import ChallengeFilters from '@/components/challenge-filter';
import ChallengeGrid from '@/components/challenge-grid';
import ChallengePagination from '@/components/challenge-pagination';
import { useChallenges } from '@/hooks/useChallenges';
import { NewButton } from '@/components/ui/new-button';
import Link from 'next/link';

export default function ManagerChallengesPage() {
  const {
    loading,
    error,
    currentChallenges,
    filterOptions,
    filters,
    setFilters,
    pagination
  } = useChallenges();

    const cleanFilterOptions = {
    ...filterOptions,
    ongs: filterOptions.ongs.filter(Boolean) as string[],
    schools: filterOptions.schools.filter(Boolean) as string[],
  };


  if (loading) {
    return (
      <div className="p-8 text-center min-h-screen">Carregando desafios...</div>
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
        <Title pageTitle="Todos os desafios" />
        <div className="container mx-auto px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Acompanhe como estão os desafios em andamento
            </h2>
            <p className="text-gray-600 mb-8">
                            Uma atitude que ensina mais do que qualquer aula. E agora é a sua escola que pode fazer a diferença, unindo aprendizado e ação para transformar vidas de verdade.
                            Veja seus desafios atuais no botão abaixo.
            </p>
          <Link href={'/manager/my-challenges'}>
            <NewButton className="bg-secondary h-[44px]">
              Ver meus desafios
            </NewButton>
          </Link>

          </div>
          <ChallengeFilters
            filterOptions={cleanFilterOptions}
            filters={filters}
            setFilters={setFilters}
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
