import api from "./api";

export enum TeachingStage {
    EDUCACAO_INFANTIL = 'EDUCACAO_INFANTIL',
    ENSINO_FUNDAMENTAL_I = 'ENSINO_FUNDAMENTAL_I',
    ENSINO_FUNDAMENTAL_II = 'ENSINO_FUNDAMENTAL_II',
    ENSINO_MEDIO = 'ENSINO_MEDIO',
}

export interface SchoolManagerData {
    id: number;
    fullName: string;
    phoneNumber?: string | null;
    email: string;
    schoolName: string;
    teachingStages: TeachingStage[];
    estimatedStudents: number;
    inepCode: string;
    cep: string;
    address: string;
    addressNumber: string;
    addressComplement?: string | null;
    schoolNumber?: string | null;
    schoolImageUrl?: string | null;
}

export type CreateSchoolManagerData = Omit<SchoolManagerData, 'id'> & { password?: string };
export type UpdateSchoolManagerData = Partial<CreateSchoolManagerData>;

export const getAllSchoolManagers = async (): Promise<SchoolManagerData[]> => {
    try {
        const response = await api.get<{ data: SchoolManagerData[] }>('/manager');
        return response.data.data;
    } catch (error) {
        console.error('Erro ao buscar gestores escolares:', error);
        throw error;
    }
};

export const getSchoolManagerById = async (id: number): Promise<SchoolManagerData | null> => {
    try {
        const response = await api.get<{ data: SchoolManagerData }>(`/manager/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Erro ao buscar gestor com ID ${id}:`, error);
        return null;
    }
};

export const createSchoolManager = async (managerData: CreateSchoolManagerData): Promise<SchoolManagerData> => {
    const response = await api.post<{ data: SchoolManagerData }>('/manager', managerData);
    return response.data.data;
};

export const updateSchoolManager = async (id: number, managerData: UpdateSchoolManagerData): Promise<SchoolManagerData> => {
    const response = await api.patch<{ data: SchoolManagerData }>(`/manager/${id}`, managerData);
    return response.data.data;
};

export const deleteSchoolManager = async (id: number): Promise<void> => {
    await api.delete(`/manager/${id}`);
};
