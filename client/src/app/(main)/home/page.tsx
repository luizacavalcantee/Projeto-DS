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

const mockRankingData = [
  { escola: 'Escola Municipal Oswaldo Lima Filho', desafios: 25 },
  { escola: 'Escola Estadual João da Silva', desafios: 22 },
  { escola: 'Colégio São José', desafios: 20 },
  { escola: 'Escola Municipal Maria Santos', desafios: 18 },
  { escola: 'Instituto Educacional Progresso', desafios: 15 },
  { escola: 'Escola Municipal Pedro Alves', desafios: 12 },
  { escola: 'Colégio Santa Clara', desafios: 10 },
  { escola: 'Colégio Santa Clara', desafios: 10 }
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="mt-24">
        <ImpactSection />
      </div>
      <section className="py-20">
        <div className="mx-auto">
          <div className="flex flex-col items-center justify-center mb-14">
            <h2 className="text-4xl font-bold leading-tight text-center">
              Confira abaixo todos os{' '}
            </h2>
            <span className="text-4xl font-bold leading-tight relative inline-block">
              <span className="relative z-10 text-secondary">
                desafios das escolas
              </span>
              <span className="absolute z-10 -bottom-1 left-0">
                <Image src={UnderlinedDark} alt="Sublinhado" />
              </span>
            </span>
          </div>

          <ChallengesCarousel />

          <div className="flex justify-center mt-10">
            <Link href="/challenges">
              <NewButton size={'lg'}>Ver Todos</NewButton>
            </Link>
          </div>
        </div>
      </section>
      <ImpactNumbers />
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
            <RankingTable data={mockRankingData} actionType="viewFullRanking" />
          </div>
        </div>
      </section>
    </main>
  );
}
