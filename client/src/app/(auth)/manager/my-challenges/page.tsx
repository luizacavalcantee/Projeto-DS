"use client";

import { useState } from "react";
import Image from "next/image";
import { Challenge, Filter, Lupa } from "@/assets";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewButton } from "@/components/ui/new-button";
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
    progress: 100,
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
    title: "Campanha de Doação de Livros",
    description: "Projeto para conscientizar sobre a importância da preservação do meio ambiente e recursos naturais.",
    progress: 85,
    link: "/challenges/6",
    linkLabel: "Ver detalhes",
    situacao: "Em andamento",
    ong: "ONG Educação",
    escola: "Escola Municipal João Silva"
  },
  {
    id: 7,
    imageSrc: Challenge,
    imageAlt: "Imagem do projeto Horta Comunitária",
    title: "Ação de Limpeza de Praias",
    description: "Projeto para conscientizar sobre a importância da preservação do meio ambiente e recursos naturais.",
    progress: 85,
    link: "/challenges/6",
    linkLabel: "Ver detalhes",
    situacao: "Em andamento",
    ong: "ONG Educação",
    escola: "Escola Municipal João Silva"
  },
  {
    id: 8,
    imageSrc: Challenge,
    imageAlt: "Imagem do projeto Horta Comunitária",
    title: "Ajuda a Animais Abandonados",
    description: "Projeto para conscientizar sobre a importância da preservação do meio ambiente e recursos naturais.",
    progress: 85,
    link: "/challenges/6",
    linkLabel: "Ver detalhes",
    situacao: "Em andamento",
    ong: "ONG Educação",
    escola: "Escola Municipal João Silva"
  },
  {
    id: 9,
    imageSrc: Challenge,
    imageAlt: "Imagem do projeto Horta Comunitária",
    title: "Doe Livros para Crianças",
    description: "Projeto para conscientizar sobre a importância da preservação do meio ambiente e recursos naturais.",
    progress: 85,
    link: "/challenges/6",
    linkLabel: "Ver detalhes",
    situacao: "Em andamento",
    ong: "ONG Educação",
    escola: "Escola Municipal David"
  },
  {
    id: 10,
    imageSrc: Challenge,
    imageAlt: "Arrecadação de Alimentos",
    title: "Ajuda a Animais Abandonados",
    description: "Projeto para conscientizar sobre a importância da preservação do meio ambiente e recursos naturais.",
    progress: 85,
    link: "/challenges/6",
    linkLabel: "Ver detalhes",
    situacao: "Em andamento",
    ong: "ONG Educação",
    escola: "Escola Municipal Kiev Gama"
  }
];

export default function ChallengePage() {
  const [searchTerm, setSearchTerm] = useState("");//pesquisa geral
  const [ongSearchTerm, setOngSearchTerm] = useState("");//filtro ong
  const [escolaSearchTerm, setEscolaSearchTerm] = useState("");//filtro escola
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSituacao, setSelectedSituacao] = useState("");
  const [selectedOng, setSelectedOng] = useState("");
  const [selectedEscola, setSelectedEscola] = useState("");
  const itemsPerPage = 8;

  // Opções dos filtros extraídas dinamicamente do mock
  const situacoes = ["Em andamento", "Finalizado", "Pausado"];
  const ongs = Array.from(new Set(mockChallenges.map(challenge => challenge.ong)));
  const escolas = Array.from(new Set(mockChallenges.map(challenge => challenge.escola)));
  
  // Filtrar ONGs baseado na pesquisa
  const filteredOngs = ongs.filter(ong =>
    ong.toLowerCase().includes(ongSearchTerm.toLowerCase())
  );

  // Filtrar escolas baseado na pesquisa
  const filteredEscolas = escolas.filter(escola =>
    escola.toLowerCase().includes(escolaSearchTerm.toLowerCase())
  );

  // filtro de pesquisa e filtros
  const filteredChallenges = mockChallenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSituacao = !selectedSituacao || selectedSituacao === "all" || challenge.situacao === selectedSituacao;
    const matchesOng = !selectedOng || selectedOng === "all" || challenge.ong === selectedOng;
    const matchesEscola = !selectedEscola || selectedEscola === "all" || challenge.escola === selectedEscola;

    return matchesSearch && matchesSituacao && matchesOng && matchesEscola;
  });

  // calculo de paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentChallenges = filteredChallenges.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredChallenges.length / itemsPerPage);

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Title pageTitle="Meus desafios" />

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
            <div className="flex gap-2 ">
              <div className="px-4 rounded-full text-primary text-sm flex items-center gap-2">
                <Image src={Filter} alt="Filtros" className="h-4 w-4" />
                Filtros:
              </div>

              {/* Filtro Situação */}
              <Select value={selectedSituacao} onValueChange={setSelectedSituacao}>
                <SelectTrigger className="w-48 h-8 bg-white rounded-full text-primary text-sm border-2 border-primary">
                  <SelectValue placeholder="Situação da iniciativa" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="all">Todas as situações</SelectItem>
                  {situacoes.map((situacao) => (
                    <SelectItem key={situacao} value={situacao}>
                      {situacao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filtro ONG */}
              <Select value={selectedOng} onValueChange={setSelectedOng}>
                <SelectTrigger className="w-48 h-8 bg-white rounded-full text-primary text-sm border-2 border-primary">
                  <SelectValue placeholder="ONG responsável" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <div className="p-2">
                    <Input
                      placeholder="Pesquisar por ONG..."
                      value={ongSearchTerm}
                      onChange={(e) => setOngSearchTerm(e.target.value)}
                      className="w-full bg-white border-2 border-primary pl-4"
                    />
                  </div>
                  <SelectItem value="all">Todas as ONGs</SelectItem>
                  {filteredOngs.map((ong) => (
                    <SelectItem key={ong} value={ong}>
                      {ong}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filtro Escola (nesse fluxo esse filtro nao existe*/}
              
            </div>

            <div className="w-1/3 ml-auto">
              <div className="relative">
                <Input
                  placeholder="Pesquisar desafios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border-2 border-primary pl-4"
                />
                <Image
                  src={Lupa}
                  alt="Pesquisar"
                  className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>

          <div>
            <hr className="my-8 border-gray-300" />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {currentChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  imageSrc={challenge.imageSrc}
                  imageAlt={challenge.imageAlt}
                  title={challenge.title}
                  description={challenge.description}
                  progress={challenge.progress}
                  link={challenge.link}
                />
              ))}
            </div>
          </div>

          <div className="mt-16 justify-center flex">
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