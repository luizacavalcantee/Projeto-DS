import api from './api';
import { OngData } from './ong.services';
import { SchoolManagerData, TeachingStage } from './schoolManager.services';

export enum ChallengeCategory {
  EDUCACAO = 'EDUCACAO',
  MEIO_AMBIENTE = 'MEIO_AMBIENTE',
  SAUDE = 'SAUDE',
  CULTURA = 'CULTURA',
  ESPORTE = 'ESPORTE',
  TECNOLOGIA = 'TECNOLOGIA',
  CIDADANIA = 'CIDADANIA',
  INCLUSAO = 'INCLUSAO',
  SUSTENTABILIDADE = 'SUSTENTABILIDADE'
}

export enum ChallengeStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface CheckpointData {
  id: number;
  title: string;
  description?: string | null;
  photoUrl?: string | null;
  completionDate?: string | null;
  checkpointNumber: number;
}

export interface ChallengeData {
  id: number;
  title: string;
  location?: string | null;
  description: string;
  startDate: string;
  endDate: string;
  idealAge: TeachingStage[];
  neededResources: string;
  category: ChallengeCategory;
  documentUrls: string[];
  photoUrl: string;
  status: ChallengeStatus;
  ongId: number;
  managerId?: number;
  ong?: OngData;
  schoolManager?: SchoolManagerData;
  checkpoints?: CheckpointData[];
}

export type CreateChallengeData = Omit<
  ChallengeData,
  'id' | 'status' | 'ong' | 'schoolManager' | 'checkpoints'
> & {
  checkpoint1Title: string;
  checkpoint2Title: string;
  checkpoint3Title: string;
};

export type UpdateChallengeData = Partial<
  Omit<CreateChallengeData, 'ongId' | 'managerId'>
>;

export const getAllChallenges = async (): Promise<ChallengeData[]> => {
  try {
    const response = await api.get<{ data: ChallengeData[] }>('/challenges');
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar desafios:', error);
    throw error;
  }
};

export const getChallengeById = async (
  id: number
): Promise<ChallengeData | null> => {
  try {
    const response = await api.get<{ data: ChallengeData }>(
      `/challenges/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao buscar desafio com ID ${id}:`, error);
    return null;
  }
};

export const createChallenge = async (
  challengeData: CreateChallengeData
): Promise<ChallengeData> => {
  const response = await api.post<{ data: ChallengeData }>(
    '/challenges',
    challengeData
  );
  return response.data.data;
};

export const updateChallenge = async (
  id: number,
  challengeData: UpdateChallengeData
): Promise<ChallengeData> => {
  const response = await api.patch<{ data: ChallengeData }>(
    `/challenges/${id}`,
    challengeData
  );
  return response.data.data;
};

export const deleteChallenge = async (id: number): Promise<void> => {
  await api.delete(`/challenges/${id}`);
};
