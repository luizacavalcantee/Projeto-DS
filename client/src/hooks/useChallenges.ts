'use client';

import { useState, useEffect, useMemo } from 'react';
import { getAllChallenges, ChallengeData, ChallengeStatus } from '@/services/challenge.services';

const ITEMS_PER_PAGE = 8;

/**
 * Hook customizado para buscar, filtrar e paginar os desafios.
 */
export function useChallenges() {
  // Estado para os dados brutos da API
  const [allChallenges, setAllChallenges] = useState<ChallengeData[]>([]);
  
  // Estados para o controlo da UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para os filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ChallengeStatus | "all">("all");
  const [selectedOng, setSelectedOng] = useState<string>("all");
  const [selectedSchool, setSelectedSchool] = useState<string>("all");
  
  // Estado para a paginação
  const [currentPage, setCurrentPage] = useState(1);

  // Efeito para buscar os dados da API quando o componente montar
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const data = await getAllChallenges();
        setAllChallenges(data);
      } catch (err) {
        console.error('Falha ao carregar desafios:', err);
        setError('Não foi possível carregar a lista de desafios.');
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  // Opções para os filtros, extraídas dinamicamente dos dados da API
  const filterOptions = useMemo(() => {
    const ongs = Array.from(new Set(allChallenges.map(c => c.ong?.name).filter(Boolean)));
    const schools = Array.from(new Set(allChallenges.map(c => c.schoolManager?.schoolName).filter(Boolean)));
    const statuses = Object.values(ChallengeStatus);
    return { ongs, schools, statuses };
  }, [allChallenges]);

  // Lógica de filtragem, memoizada para performance
  const filteredChallenges = useMemo(() => {
    return allChallenges.filter((challenge) => {
      const matchesSearch =
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === "all" || challenge.status === selectedStatus;
      const matchesOng = selectedOng === "all" || challenge.ong?.name === selectedOng;
      const matchesSchool = selectedSchool === "all" || challenge.schoolManager?.schoolName === selectedSchool;

      return matchesSearch && matchesStatus && matchesOng && matchesSchool;
    });
  }, [allChallenges, searchTerm, selectedStatus, selectedOng, selectedSchool]);

  // Lógica de paginação
  const totalPages = Math.ceil(filteredChallenges.length / ITEMS_PER_PAGE);
  const currentChallenges = filteredChallenges.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return {
    loading,
    error,
    currentChallenges,
    filterOptions,
    filters: { searchTerm, selectedStatus, selectedOng, selectedSchool },
    setFilters: { setSearchTerm, setSelectedStatus, setSelectedOng, setSelectedSchool },
    pagination: { currentPage, totalPages, setCurrentPage },
  };
}
