import api from './api';

export interface OngData {
    id: number;
    name: string;
    email: string;
    description: string;
    contactPhone?: string | null;
    instagramLink?: string | null;
    facebookLink?: string | null;
    site?: string | null;
    coverPhotoUrl?: string | null;
    logoPhotoUrl?: string | null;
}

export type CreateOngData = Omit<OngData, 'id'> & { password_hash: string };
export type UpdateOngData = Partial<Omit<OngData, 'id'>>;

export const getAllOngs = async (): Promise<OngData[]> => {
    try {
        const response = await api.get<{ data: OngData[] }>('/ong');
        return response.data.data;
    } catch (error) {
        console.error('Erro ao buscar ONGs:', error);
        throw error;
    }
};

export const getOngById = async (id: number): Promise<OngData | null> => {
    try {
        const response = await api.get<OngData>(`/ong/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar ONG com ID ${id}:`, error);
        return null;
    }
};

export const createOng = async (ongData: CreateOngData): Promise<OngData> => {
    const response = await api.post<OngData>('/ong', ongData);
    return response.data;
};

export const updateOng = async (id: number, ongData: UpdateOngData): Promise<OngData> => {
    const response = await api.patch<OngData>(`/ong/${id}`, ongData);
    return response.data;
};

export const deleteOng = async (id: number): Promise<void> => {
    await api.delete(`/ong/${id}`);
};
