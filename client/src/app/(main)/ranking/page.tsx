import RankingTable from '@/components/ranking-table';
import RankingComponent from '@/components/ranking';
import Title from '@/components/title';
import ScoringGuide from '@/components/scoring-guide';
import Image from 'next/image';
import ChallengesCarousel from '@/components/challenges-carousel';
import { Underline, UnderlinedDark } from '@/assets';
import Link from 'next/link';
import { NewButton } from '@/components/ui/new-button';

export default function Ranking() {
  return (
    <main className="min-h-screen flex flex-col">
        <Title pageTitle="Ranking" />
      <section className="flex w-full flex-col items-center justify-center px-4 py-8 md:px-12 md:py-12 lg:px-16">

        <h2 className="mt-8 text-center text-3xl font-bold leading-tight md:mt-12 md:text-4xl">
          Veja as escolas que estão mais{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-primary">impactando</span>
            <span className="absolute z-10 -bottom-1 left-0 w-full">
              <Image
                src={Underline}
                alt="Sublinhado"
                layout="responsive"
                objectFit="contain"
              />
            </span>
          </span>
        </h2>

        <p className="mt-4 max-w-3xl text-center text-gray-600 md:mt-3 mb-12 md:mb-16">
          Este ranking celebra as escolas de Recife que mais geraram impacto
          social através de projetos de voluntariado e inovação. Suba no ranking
          e inspire a sua comunidade!
        </p>

        <div className="flex w-full flex-col items-center justify-center gap-10 md:gap-16">
          <RankingComponent />
          <RankingTable actionType="loadMore" />
        </div>
      </section>

      <section className="w-full my-12 md:my-20">
        <ScoringGuide />
      </section>

      <section className="flex w-full flex-col items-center justify-center px-4 pt-8 md:px-12 lg:px-16">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Escolha seu desafio e{' '}
          </h2>
          <span className="text-3xl font-bold leading-tight relative inline-block md:text-4xl">
            <span className="relative z-10 text-secondary">bora impactar</span>
            <span className="absolute z-10 -bottom-1 left-0 w-full">
              <Image
                src={UnderlinedDark}
                alt="Sublinhado"
                layout="responsive"
                objectFit="contain"
              />
            </span>
          </span>
        </div>
        
        <div className="w-full mt-8 md:mt-12">
          <ChallengesCarousel />
        </div>

        <div className="mt-10 mb-16 flex justify-center md:mb-24">
          <Link href="/challenges">
            <NewButton size={'lg'}>Ver Todos</NewButton>
          </Link>
        </div>
      </section>
    </main>
  );
}