import Hero from '@/components/hero';
import ImpactNumbers from '@/components/impact-numbers';
import ImpactSection from '@/components/impact-section';
import Ranking from '@/components/ranking';
import RankingTable from '@/components/ranking-table';
import ChallengeCard from '@/components/challenge-card';
import { Challenge as CardDesafio } from '@/assets';


//dados que foram mockados para demonstração
const mockRankingData = [
  { escola: 'Escola Municipal Oswaldo Lima Filho', desafios: 25 },
  { escola: 'Escola Estadual João da Silva', desafios: 22 },
  { escola: 'Colégio São José', desafios: 20 },
  { escola: 'Escola Municipal Maria Santos', desafios: 18 },
  { escola: 'Instituto Educacional Progresso', desafios: 15 },
  { escola: 'Escola Municipal Pedro Alves', desafios: 12 },
  { escola: 'Colégio Santa Clara', desafios: 10 },
];

const mockChallenges = [
  {
    imageSrc: CardDesafio,
    imageAlt: 'Desafio de reciclagem',
    title: 'Reciclagem na Escola',
    description: 'Projeto para implementar coleta seletiva e conscientização ambiental na escola.',
    progress: 75,
    link: '/challenges/1'
  },
  {
    imageSrc: CardDesafio,
    imageAlt: 'Desafio de horta comunitária',
    title: 'Horta Comunitária',
    description: 'Criação de uma horta orgânica para alimentação saudável dos alunos.',
    progress: 45,
    link: '/challenges/2'
  },
  {
    imageSrc: CardDesafio,
    imageAlt: 'Desafio de leitura',
    title: 'Clube de Leitura',
    description: 'Incentivo à leitura através de encontros semanais e troca de livros.',
    progress: 90,
    link: '/challenges/3'
  }
];

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <Hero />
            {/* Impact Section */}
            <div className="mt-24">
                <ImpactSection />
            </div>
            {/* Challenges Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">
                        Confira abaixo todos os <span className="text-primary underline decoration-blue-400 decoration-4">desafios das escolas</span>
                    </h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mockChallenges.map((challenge, index) => (
                            <ChallengeCard
                                key={index}
                                imageSrc={challenge.imageSrc}
                                imageAlt={challenge.imageAlt}
                                title={challenge.title}
                                description={challenge.description}
                                progress={challenge.progress}
                                link={challenge.link}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center mt-10">
                        <button className="px-8 py-3 bg-blue-600 text-white rounded font-bold text-lg shadow hover:bg-blue-700 transition">Ver Todos</button>
                    </div>
                </div>
            </section>
            {/* Impact Numbers Section */}
            <ImpactNumbers />
            {/* Ranking Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        Veja o nosso <span className="text-primary">ranking</span>
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                        <div className="lg:w-1/2">
                            <Ranking />
                        </div>
                        <div className="lg:w-1/2">
                            <RankingTable 
                                data={mockRankingData} 
                                actionType="viewFullRanking" 
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}