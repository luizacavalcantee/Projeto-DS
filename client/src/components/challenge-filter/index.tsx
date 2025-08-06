'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Filter, Lupa } from '@/assets';
import { ChallengeStatus } from '@/services/challenge.services';

interface ChallengeFiltersProps {
  filterOptions: {
    ongs: string[];
    schools: string[];
    statuses: ChallengeStatus[];
  };
  filters: {
    searchTerm: string;
    selectedStatus: ChallengeStatus | 'all';
    selectedOng: string;
    selectedSchool: string;
  };
  setFilters: {
    setSearchTerm: (value: string) => void;
    setSelectedStatus: (value: ChallengeStatus | 'all') => void;
    setSelectedOng: (value: string) => void;
    setSelectedSchool: (value: string) => void;
  };
  hideFilters?: ('ong' | 'school')[];
}

export default function ChallengeFilters({
  filterOptions,
  filters,
  setFilters,
  hideFilters = []
}: ChallengeFiltersProps) {
  const statusLabels: { [key in ChallengeStatus]: string } = {
    PENDING: 'Pendente',
    IN_PROGRESS: 'Em Andamento',
    COMPLETED: 'Concluído'
  };
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-fit lg:w-full mb-8 mx-auto">
      <div className="flex items-center gap-2 flex-wrap w-fit lg:flex-row">
        <div className="px-4 rounded-full text-primary text-sm flex items-center gap-2">
          <Image src={Filter} alt="Filtros" className="h-4 w-4" />
          Filtros:
        </div>

        <Select
          value={filters.selectedStatus}
          onValueChange={setFilters.setSelectedStatus}
        >
          <SelectTrigger className="w-full md:w-fit gap-2 h-8 bg-white rounded-full text-primary text-sm border-2 border-primary">
            <SelectValue placeholder="Situação" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">Todas as Situações</SelectItem>
            {filterOptions.statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {statusLabels[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {!hideFilters.includes('ong') && (
          <Select
            value={filters.selectedOng}
            onValueChange={setFilters.setSelectedOng}
          >
            <SelectTrigger className="w-full md:w-fit gap-2 h-8 bg-white rounded-full text-primary text-sm border-2 border-primary">
              <SelectValue placeholder="ONG" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Todas as ONGs</SelectItem>
              {filterOptions.ongs.map((ong) => (
                <SelectItem key={ong} value={ong}>
                  {ong}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {!hideFilters.includes('school') && (
          <Select
            value={filters.selectedSchool}
            onValueChange={setFilters.setSelectedSchool}
          >
            <SelectTrigger className="w-full md:w-fit gap-2 h-8 bg-white rounded-full text-primary text-sm border-2 border-primary">
              <SelectValue placeholder="Escola" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Todas as Escolas</SelectItem>
              {filterOptions.schools.map((school) => (
                <SelectItem key={school} value={school}>
                  {school}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="relative w-full lg:w-96 lg:ml-auto">
        <Input
          placeholder="Pesquise um desafio"
          value={filters.searchTerm}
          onChange={(e) => setFilters.setSearchTerm(e.target.value)}
          className="w-full bg-white border-2 border-primary pl-4 mr-2"
        />
        <Image
          src={Lupa}
          alt="Pesquisar"
          className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}
