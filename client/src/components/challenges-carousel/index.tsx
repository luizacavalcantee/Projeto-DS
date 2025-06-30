import * as React from 'react';

import ChallengeCard from '@/components/challenge-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Challenge } from '@/assets';

const mockChallenges = [
  {
    id: 1,
    imageSrc: Challenge,
    imageAlt: 'Imagem do projeto Horta Comunitária',
    title: 'Horta Comunitária na Escola',
    description:
      'Projeto para criar uma horta comunitária que possa fornecer alimentos para a escola e comunidade local.',
    progress: 75,
    link: '/challenges/1',
    linkLabel: 'Ver detalhes',
    situacao: 'Em andamento',
    ong: 'ONG Verde',
    escola: 'Escola Municipal João Silva'
  },
  {
    id: 2,
    imageSrc: Challenge,
    imageAlt: 'Imagem do projeto Horta Comunitária',
    title: 'Reciclagem de Materiais',
    description:
      'Iniciativa para coletar e reciclar materiais, promovendo a consciência ambiental entre os alunos.',
    progress: 100,
    link: '/challenges/2',
    linkLabel: 'Ver detalhes',
    situacao: 'Finalizado',
    ong: 'ONG Recicla',
    escola: 'Escola Estadual Maria Santos'
  },
  {
    id: 3,
    imageSrc: Challenge,
    imageAlt: 'Imagem do projeto Horta Comunitária',
    title: 'Aulas de Reforço',
    description:
      'Alunos mais avançados ajudam colegas com dificuldades em determinadas matérias através de aulas de reforço.',
    progress: 90,
    link: '/challenges/3',
    linkLabel: 'Ver detalhes',
    situacao: 'Pausado',
    ong: 'ONG Educação',
    escola: 'Escola Estadual Maria Santos'
  },
  {
    id: 4,
    imageSrc: Challenge,
    imageAlt: 'Imagem do projeto Horta Comunitária',
    title: 'Campanha de Arrecadação',
    description:
      'Organização de campanha para arrecadar alimentos e roupas para famílias carentes da comunidade.',
    progress: 60,
    link: '/challenges/4',
    linkLabel: 'Ver detalhes',
    situacao: 'Pausado',
    ong: 'ONG Educação',
    escola: 'Escola Municipal Ana Luisa'
  },
  {
    id: 5,
    imageSrc: Challenge,
    imageAlt: 'Imagem do projeto Horta Comunitária',
    title: 'Festival Cultural',
    description:
      'Evento para celebrar a diversidade cultural, com apresentações artísticas e culinária de diferentes regiões.',
    progress: 30,
    link: '/challenges/5',
    linkLabel: 'Ver detalhes',
    situacao: 'Em andamento',
    ong: 'ONG Educação',
    escola: 'Escola Municipal Luiza Cavalcante'
  },
  {
    id: 6,
    imageSrc: Challenge,
    imageAlt: 'Imagem do projeto Horta Comunitária',
    title: 'Campanha de Doação de Livros',
    description:
      'Projeto para conscientizar sobre a importância da preservação do meio ambiente e recursos naturais.',
    progress: 85,
    link: '/challenges/6',
    linkLabel: 'Ver detalhes',
    situacao: 'Em andamento',
    ong: 'ONG Educação',
    escola: 'Escola Municipal João Silva'
  },
  {
    id: 7,
    imageSrc: Challenge,
    imageAlt: 'Imagem do projeto Horta Comunitária',
    title: 'Ação de Limpeza de Praias',
    description:
      'Projeto para conscientizar sobre a importância da preservação do meio ambiente e recursos naturais.',
    progress: 85,
    link: '/challenges/6',
    linkLabel: 'Ver detalhes',
    situacao: 'Em andamento',
    ong: 'ONG Educação',
    escola: 'Escola Municipal João Silva'
  },
  {
    id: 8,
    imageSrc: Challenge,
    imageAlt: 'Imagem do projeto Horta Comunitária',
    title: 'Ajuda a Animais Abandonados',
    description:
      'Projeto para conscientizar sobre a importância da preservação do meio ambiente e recursos naturais.',
    progress: 85,
    link: '/challenges/6',
    linkLabel: 'Ver detalhes',
    situacao: 'Em andamento',
    ong: 'ONG Educação',
    escola: 'Escola Municipal João Silva'
  },
  {
    id: 9,
    imageSrc: Challenge,
    imageAlt: 'Imagem do projeto Horta Comunitária',
    title: 'Doe Livros para Crianças',
    description:
      'Projeto para conscientizar sobre a importância da preservação do meio ambiente e recursos naturais.',
    progress: 85,
    link: '/challenges/6',
    linkLabel: 'Ver detalhes',
    situacao: 'Em andamento',
    ong: 'ONG Educação',
    escola: 'Escola Municipal David'
  },
  {
    id: 10,
    imageSrc: Challenge,
    imageAlt: 'Arrecadação de Alimentos',
    title: 'Ajuda a Animais Abandonados',
    description:
      'Projeto para conscientizar sobre a importância da preservação do meio ambiente e recursos naturais.',
    progress: 85,
    link: '/challenges/6',
    linkLabel: 'Ver detalhes',
    situacao: 'Em andamento',
    ong: 'ONG Educação',
    escola: 'Escola Municipal Kiev Gama'
  }
];

export function ChallengesCarousel() {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      className="w-full max-w-6xl h-fit"
    >
      <CarouselContent>
        {mockChallenges.map((challenge) => (
          <CarouselItem
            key={challenge.id}
            className="basis-1/2"
          >
            <div className="p-1 h-full">
              <ChallengeCard
                imageSrc={challenge.imageSrc}
                imageAlt={challenge.imageAlt}
                title={challenge.title}
                description={challenge.description}
                progress={challenge.progress}
                link={challenge.link}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
