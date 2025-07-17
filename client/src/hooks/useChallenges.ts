'use client';

import { useState, useEffect, useMemo } from 'react';
import { getAllChallenges, ChallengeData, ChallengeStatus } from '@/services/challenge.services';

const ITEMS_PER_PAGE = 8;

// Adicionamos um parâmetro opcional 'initialFilter' ao hook
export function useChallenges(
  initialFilter?: { ongId?: number; managerId?: number }
) {
  const [allChallenges, setAllChallenges] = useState<ChallengeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ChallengeStatus | "all">("all");
  const [selectedOng, setSelectedOng] = useState<string>("all");
  const [selectedSchool, setSelectedSchool] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

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

  const filterOptions = useMemo(() => {
    const ongs = Array.from(new Set(allChallenges.map(c => c.ong?.name).filter(Boolean)));
    const schools = Array.from(new Set(allChallenges.map(c => c.schoolManager?.schoolName).filter(Boolean)));
    const statuses = Object.values(ChallengeStatus);
    return { ongs, schools, statuses };
  }, [allChallenges]);

  // A lógica de filtragem agora considera o filtro inicial passado para o hook
  const filteredChallenges = useMemo(() => {
    let challenges = allChallenges;

    // 1. Aplica o filtro inicial (da ONG ou Gestor logado)
    if (initialFilter) {
      challenges = challenges.filter(challenge => {
        if (initialFilter.ongId && challenge.ongId !== initialFilter.ongId) return false;
        if (initialFilter.managerId && challenge.managerId !== initialFilter.managerId) return false;
        return true;
      });
    }

    // 2. Aplica os filtros da UI sobre a lista já pré-filtrada
    return challenges.filter((challenge) => {
      const matchesSearch =
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === "all" || challenge.status === selectedStatus;
      const matchesOng = selectedOng === "all" || challenge.ong?.name === selectedOng;
      const matchesSchool = selectedSchool === "all" || challenge.schoolManager?.schoolName === selectedSchool;

      return matchesSearch && matchesStatus && matchesOng && matchesSchool;
    });
  }, [allChallenges, searchTerm, selectedStatus, selectedOng, selectedSchool, initialFilter]);

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
