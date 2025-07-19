"use client";

import Hero from '@/components/hero';
import ImpactNumbers from '@/components/impact-numbers';
import ImpactSection from '@/components/impact-section';
import Ranking from '@/components/ranking';
import RankingTable from '@/components/ranking-table';
import { Underline, UnderlinedDark } from '@/assets';
import { ChallengesCarousel } from '@/components/challenges-carousel';
import { NewButton } from '@/components/ui/new-button';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
    const { user } = useAuth();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero showButtons leftButton={'/ong/challenges'} rightButton={'/ong/my-challenges'}/>
      {/* Impact Section */}
      <div className="mt-24">
        <ImpactSection />
      </div>
      {/* Challenges Section */}
      <section className="py-20">
        <div className="mx-auto">
          <div className="flex flex-col items-center justify-center mb-14">
            <h2 className="text-4xl font-bold leading-tight text-center">
              Confira abaixo o andamento{' '}
            </h2>
            <span className="text-4xl font-bold leading-tight relative inline-block">
              <span className="relative z-10 text-secondary">
                dos seus desafios
              </span>
              <span className="absolute z-10 -bottom-1 left-0">
                <Image src={UnderlinedDark} alt="Sublinhado" />
              </span>
            </span>
          </div>

          <ChallengesCarousel 
            filter={user?.type === 'ong' ? { ongId: user.id } : undefined} 
          />
            <div className="flex justify-center gap-4 mt-10">
              <Link href="/challenges">
                <NewButton className="px-10 py-3">Ver Todos</NewButton>
              </Link>
              <Link href="/login">
                <NewButton className="px-10 py-3" variant="white">Ver os meus</NewButton>
              </Link>
            </div>
        </div>
      </section>
      {/* Impact Numbers Section */}
      <ImpactNumbers />
      {/* Ranking Section */}
      <section className="py-16 px-4">
        <div className="mx-auto">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold leading-tight">
              Veja o nosso{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">ranking</span>
                <span className="absolute z-10 -bottom-1 left-0">
                  <Image src={Underline} alt="Sublinhado" />
                </span>
              </span>
            </h2>
            <p className="mb-12 text-center mt-2 text-lg">
              Aqui você pode acompanhar o{' '}
              <span className="font-bold">engajamento</span> das escolas do
              Recife.
            </p>
          </div>
          <div className="flex gap-32 items-center justify-center mx-16 mb-20">
            <Ranking />
            <RankingTable actionType="viewFullRanking" />
          </div>
        </div>
      </section>
    </main>
  );
}
