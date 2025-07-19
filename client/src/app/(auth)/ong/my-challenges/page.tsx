'use client';

import Title from '@/components/title';
import ChallengeFilters from '@/components/challenge-filter';
import ChallengeGrid from '@/components/challenge-grid';
import ChallengePagination from '@/components/challenge-pagination';
import { useChallenges } from '@/hooks/useChallenges';
import { useAuth } from '@/hooks/useAuth'; // 1. Importar o hook de autenticação
import { NewButton } from '@/components/ui/new-button';
import Link from 'next/link';

export default function OngMyChallengesPage() {
  // 2. Obter o utilizador autenticado
  const { user, loading: authLoading } = useAuth();

  // 3. Passar o filtro inicial para o hook useChallenges
  const {
    loading: challengesLoading,
    error,
    currentChallenges,
    filterOptions,
    filters,
    setFilters,
    pagination
  } = useChallenges(
    // Só passa o filtro se o utilizador for uma ONG
    user?.type === 'ong' ? { ongId: user.id } : undefined
  );

  // Combina os estados de carregamento
  const loading = authLoading || challengesLoading;

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
        <Title pageTitle="Meus desafios" />
        <div className="container mx-auto px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Acompanhe os seus desafios
            </h2>
            <p className="text-gray-600 mb-8">
              Aqui você pode ver todos os desafios propostos pela sua ONG. Crie um novo desafio clicando no botão abaixo.
            </p>
            <Link href={'/ong/my-challenges/create-challenge'}>
              <NewButton className="bg-secondary h-[44px]">
                Criar novo desafio
              </NewButton>
            </Link>
          </div>
          
          {/* 4. Passar a prop para esconder o filtro de ONG */}
          <ChallengeFilters
            filterOptions={cleanFilterOptions}
            filters={filters}
            setFilters={setFilters}
            hideFilters={['ong']}
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
