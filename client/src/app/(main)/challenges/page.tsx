"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Challenge, BoraImpactar } from "@/assets";
import { Input } from "@/components/ui/input";
import { NewButton } from "@/components/ui/new-button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Title from "@/components/title";
import ChallengeCard from "@/components/challenge-card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Mock dos dados dos desafios
const mockChallenges = [
  {
    id: 1,
    imageSrc: Challenge, 
    imageAlt: "Imagem do projeto Horta Comunitária", 
    title: "Horta Comunitária na Escola",
    description: "Projeto para criar uma horta comunitária que possa fornecer alimentos para a escola e comunidade local.",
    progress: 75,
    link: "/challenges/1",
    linkLabel: "Ver detalhes"
  },
  {
    id: 2,
    imageSrc: Challenge, 
    imageAlt: "Imagem do projeto Horta Comunitária", 
    title: "Reciclagem de Materiais",
    description: "Iniciativa para coletar e reciclar materiais, promovendo a consciência ambiental entre os alunos.",
    progress: 45,
    link: "/challenges/2",
    linkLabel: "Ver detalhes"
  },
  {
    id: 3,
    imageSrc: Challenge, 
    imageAlt: "Imagem do projeto Horta Comunitária", 
    title: "Aulas de Reforço",
    description: "Alunos mais avançados ajudam colegas com dificuldades em determinadas matérias através de aulas de reforço.",
    progress: 90,
    link: "/challenges/3",
    linkLabel: "Ver detalhes"
  },
  {
    id: 4,
    imageSrc: Challenge, 
    imageAlt: "Imagem do projeto Horta Comunitária", 
    title: "Campanha de Arrecadação",
    description: "Organização de campanha para arrecadar alimentos e roupas para famílias carentes da comunidade.",
    progress: 60,
    link: "/challenges/4",
    linkLabel: "Ver detalhes"
  },
  {
    id: 5,
    imageSrc: Challenge, 
    imageAlt: "Imagem do projeto Horta Comunitária", 
    title: "Festival Cultural",
    description: "Evento para celebrar a diversidade cultural, com apresentações artísticas e culinária de diferentes regiões.",
    progress: 30,
    link: "/challenges/5",
    linkLabel: "Ver detalhes"
  },
  {
    id: 6,
    imageSrc: Challenge, 
    imageAlt: "Imagem do projeto Horta Comunitária", 
    title: "Campanha de Conscientização",
    description: "Projeto para conscientizar sobre a importância da preservação do meio ambiente e recursos naturais.",
    progress: 85,
    link: "/challenges/6",
    linkLabel: "Ver detalhes"
  }
];

export default function ChallengePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // filtro de pesquisa
  const filteredChallenges = mockChallenges.filter(
    (challenge) =>
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // calculo de paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentChallenges = filteredChallenges.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredChallenges.length / itemsPerPage);

  return (
    <main className="min-h-screen flex flex-col">
      
      <div className=" flex-grow">
        <Title pageTitle="Desafios" />
        
        <div className="container mx-auto px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Acompanhe como estão os desafios em andamento
            </h2>
            <p className="text-gray-600">
              Aqui estão as atividades em andamento dos desafios que já chegaram à fase onde seus alunos
              começam a implementação e você pode acompanhar seu progresso.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm">Filtros</button>
              <button className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm">Escolas do Projeto</button>
              <button className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm">Ano Escolar</button>
            </div>
            
            <div className="w-1/3 ml-auto">
              <Input 
                placeholder="Pesquisar desafios..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="grid x-full grid-cols-2 gap-6">
           {currentChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                imageSrc={challenge.imageSrc}
                imageAlt={challenge.imageAlt}
                title={challenge.title}
                description={challenge.description}
                progress={challenge.progress}
                link={challenge.link}
                linkLabel={challenge.linkLabel}
              />
            ))}
          </div>
          
          <div className="mt-8 justify-center flex">
            {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink 
                      href="#" 
                      isActive={currentPage === index + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
          </div>
          
          

        </div>
      </div>
    </main>
  );
}
