"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Challenge, BoraImpactar, Filter, ArrowDown, Lupa } from "@/assets";
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
    linkLabel: "Ver detalhes",
    situacao: "Em andamento",
    ong: "ONG Verde",
    escola: "Escola Municipal João Silva"
    
  },
  {
    id: 2,
    imageSrc: Challenge,
    imageAlt: "Imagem do projeto Horta Comunitária",
    title: "Reciclagem de Materiais",
    description: "Iniciativa para coletar e reciclar materiais, promovendo a consciência ambiental entre os alunos.",
    progress: 45,
    link: "/challenges/2",
    linkLabel: "Ver detalhes",
    situacao: "Finalizado",
    ong: "ONG Recicla",
    escola: "Escola Estadual Maria Santos"
  },
  {
    id: 3,
    imageSrc: Challenge,
    imageAlt: "Imagem do projeto Horta Comunitária",
    title: "Aulas de Reforço",
    description: "Alunos mais avançados ajudam colegas com dificuldades em determinadas matérias através de aulas de reforço.",
    progress: 90,
    link: "/challenges/3",
    linkLabel: "Ver detalhes",
    situacao: "Pausado",
    ong: "ONG Educação",
    escola: "Escola Estadual Maria Santos"
  },
  {
    id: 4,
    imageSrc: Challenge,
    imageAlt: "Imagem do projeto Horta Comunitária",
    title: "Campanha de Arrecadação",
    description: "Organização de campanha para arrecadar alimentos e roupas para famílias carentes da comunidade.",
    progress: 60,
    link: "/challenges/4",
    linkLabel: "Ver detalhes",
    situacao: "Pausado",
    ong: "ONG Educação",
    escola: "Escola Municipal Ana Luisa"
  },
  {
    id: 5,
    imageSrc: Challenge,
    imageAlt: "Imagem do projeto Horta Comunitária",
    title: "Festival Cultural",
    description: "Evento para celebrar a diversidade cultural, com apresentações artísticas e culinária de diferentes regiões.",
    progress: 30,
    link: "/challenges/5",
    linkLabel: "Ver detalhes",
    situacao: "Em andamento",
    ong: "ONG Educação",
    escola: "Escola Municipal Luiza Cavalcante"
  },
  {
    id: 6,
    imageSrc: Challenge,
    imageAlt: "Imagem do projeto Horta Comunitária",
    title: "Campanha de Conscientização",
    description: "Projeto para conscientizar sobre a importância da preservação do meio ambiente e recursos naturais.",
    progress: 85,
    link: "/challenges/6",
    linkLabel: "Ver detalhes",
    situacao: "Em andamento",
    ong: "ONG Educação",
    escola: "Escola Municipal João Silva"
  }
];

export default function ChallengePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSituacao, setSelectedSituacao] = useState("");
  const [selectedOng, setSelectedOng] = useState("");
  const [selectedEscola, setSelectedEscola] = useState("");
  const [openDropdown, setOpenDropdown] = useState("");
  const itemsPerPage = 4;

  // Opções dos filtros extraídas dinamicamente do mock
  const situacoes = ["Em andamento", "Finalizado", "Pausado"];
  const ongs = [...new Set(mockChallenges.map(challenge => challenge.ong))];
  const escolas = [...new Set(mockChallenges.map(challenge => challenge.escola))];

  // Função para alternar dropdown
  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? "" : dropdownName);
  };

  // filtro de pesquisa e filtros
  const filteredChallenges = mockChallenges.filter((challenge) => {
    const matchesSearch = 
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSituacao = !selectedSituacao || challenge.situacao === selectedSituacao;
    const matchesOng = !selectedOng || challenge.ong === selectedOng;
    const matchesEscola = !selectedEscola || challenge.escola === selectedEscola;

    return matchesSearch && matchesSituacao && matchesOng && matchesEscola;
  });

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
              Uma atitude que ensina mais do que qualquer aula.
              E agora é a sua escola que pode fazer a diferença, unindo aprendizado e ação para transformar vidas de verdade.
            </p>
          </div>

          <div className=" flex flex-wrap items-center gap-4 mb-8">
            <div className="flex gap-2">
              <div className="px-4 rounded-full text-secondary text-sm flex items-center gap-2">
                <Image src={Filter} alt="Filtros" className="h-4 w-4" />
                Filtros:
              </div>

              {/* Filtro Situação */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("situacao")}
                  className="px-4 h-[32px] bg-white rounded-full text-secondary text-sm border-2 border-secondary flex items-center gap-2">
                  {selectedSituacao || "Situação da iniciativa"}
                  <Image src={ArrowDown} alt="Filtros" className="h-2 w-2" />
                </button>
                {openDropdown === "situacao" && (
                  <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div 
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setSelectedSituacao("");
                        setOpenDropdown("");
                      }}
                    >
                      Todas as situações
                    </div>
                    {situacoes.map((situacao) => (
                      <div
                        key={situacao}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => {
                          setSelectedSituacao(situacao);
                          setOpenDropdown("");
                        }}
                      >
                        {situacao}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Filtro ONG */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("ong")}
                  className="px-4 h-[32px] bg-white rounded-full text-secondary text-sm border-2 border-secondary flex items-center gap-2">
                  {selectedOng || "ONG responsável"}
                  <Image src={ArrowDown} alt="Filtros" className="h-2 w-2" />
                </button>
                {openDropdown === "ong" && (
                  <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div 
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setSelectedOng("");
                        setOpenDropdown("");
                      }}
                    >
                      Todas as ONGs
                    </div>
                    {ongs.map((ong) => (
                      <div
                        key={ong}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => {
                          setSelectedOng(ong);
                          setOpenDropdown("");
                        }}
                      >
                        {ong}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Filtro Escola */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("escola")}
                  className="px-4 h-[32px] bg-white rounded-full text-secondary text-sm border-2 border-secondary flex items-center gap-2">
                  {selectedEscola || "Escola participando"}
                  <Image src={ArrowDown} alt="Filtros" className="h-2 w-2" />
                </button>
                {openDropdown === "escola" && (
                  <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div 
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setSelectedEscola("");
                        setOpenDropdown("");
                      }}
                    >
                      Todas as escolas
                    </div>
                    {escolas.map((escola) => (
                      <div
                        key={escola}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => {
                          setSelectedEscola(escola);
                          setOpenDropdown("");
                        }}
                      >
                        {escola}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-1/3 ml-auto">
              <div className="relative">
                <Input
                  placeholder="Pesquisar desafios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border-2 border-secondary pl-4"
                />
                <Image
                  src={Lupa}
                  alt="Pesquisar"
                  className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className=" pl-16 grid grid-cols-2 gap-4">
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