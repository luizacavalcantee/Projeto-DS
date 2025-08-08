import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import api from './api';

export interface RankedSchool {
  id: number;
  schoolName: string;
  schoolImageUrl?: string | StaticImport | null;
  completedChallengesCount: number;
}

/**
 * Busca o ranking das escolas ordenado do backend.
 */
export const getSchoolRanking = async (): Promise<RankedSchool[]> => {
  try {
    const response = await api.get<{ data: RankedSchool[] }>('/ranking');
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar o ranking das escolas:", error);
    throw error;
  }
};
