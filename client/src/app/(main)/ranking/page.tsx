import RankingTable from '@/components/ranking-table';
import RankingComponent from '@/components/ranking';
import Title from '@/components/title';
import ScoringGuide from '@/components/scoring-guide';
import Image from 'next/image';
import { ChallengesCarousel } from '@/components/challenges-carousel';
import { Underline, UnderlinedDark } from '@/assets';
import Link from 'next/link';
import { NewButton } from '@/components/ui/new-button';

const mockRankingData = [
  { escola: 'Escola Municipal Oswaldo Lima Filho', desafios: 25 },
  { escola: 'Escola Estadual João da Silva', desafios: 22 },
  { escola: 'Colégio São José', desafios: 20 },
  { escola: 'Escola Municipal Maria Santos', desafios: 18 },
  { escola: 'Instituto Educacional Progresso', desafios: 15 },
  { escola: 'Escola Municipal Pedro Alves', desafios: 12 },
  { escola: 'Colégio Santa Clara', desafios: 10 },
  { escola: 'Colégio Santa Clara', desafios: 10 },
  { escola: 'Escola Técnica Recife', desafios: 9 },
  { escola: 'Colégio Dom Bosco', desafios: 8 },
  { escola: 'Escola Municipal Aurora', desafios: 7 },
  { escola: 'Colégio Adventista Recife', desafios: 7 },
  { escola: 'Escola Estadual Barão de Souza', desafios: 6 },
  { escola: 'Instituto Educacional Futuro', desafios: 5 },
  { escola: 'Escola Municipal Boa Vista', desafios: 4 },
  { escola: 'Colégio Anglo Recife', desafios: 4 },
  { escola: 'Escola Estadual Nova Esperança', desafios: 3 },
  { escola: 'Colégio Marista São Luís', desafios: 2 }
];

export default function Ranking() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center">
        <Title pageTitle="Ranking" />
        <h2 className="text-4xl font-bold leading-tight mt-12 text-center">
          Veja as escolas que estão mais{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-primary">impactando</span>
            <span className="absolute z-10 -bottom-1 left-0">
              <Image src={Underline} alt="Sublinhado" />
            </span>
          </span>
        </h2>

        <p className="text-center max-w-[673px] mt-3 mb-16">
          Este ranking celebra as escolas de Recife que mais geraram impacto
          social através de projetos de voluntariado e inovação. Suba no ranking
          e inspire a sua comunidade!
        </p>
        <div className="flex flex-col items-center justify-center gap-16 w-full">
          <RankingComponent />

          <RankingTable actionType="loadMore" data={mockRankingData} />
        </div>
        <ScoringGuide />
        <div className="flex flex-col items-center justify-center mb-14">
          <h2 className="text-4xl font-bold leading-tight text-center">
            Escolha seu desafio e{' '}
          </h2>
          <span className="text-4xl font-bold leading-tight relative inline-block">
            <span className="relative z-10 text-secondary">
              bora impactar
            </span>
            <span className="absolute z-10 -bottom-1 left-0">
              <Image src={UnderlinedDark} alt="Sublinhado" />
            </span>
          </span>
        </div>

        <ChallengesCarousel />
        <div className="flex justify-center mt-10 mb-24">
          <Link href="/challenges">
            <NewButton size={'lg'}>Ver Todos</NewButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
