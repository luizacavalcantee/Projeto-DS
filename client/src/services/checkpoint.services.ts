import api from "./api";

export interface CheckpointData {
    id: number;
    title: string;
    description?: string | null;
    photoUrl?: string | null;
    completionDate?: string | null;
    checkpointNumber: number;
    challengeId: number;
}

export type UpdateCheckpointData = {
    description?: string;
    photoUrl?: string;
    completionDate?: string;
};

export const getCheckpointById = async (id: number): Promise<CheckpointData | null> => {
    try {
        const response = await api.get<{ data: CheckpointData }>(`/checkpoints/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Erro ao buscar checkpoint com ID ${id}:`, error);
        return null;
    }
};

export const updateCheckpoint = async (id: number, checkpointData: UpdateCheckpointData): Promise<CheckpointData> => {
    const response = await api.patch<{ data: CheckpointData }>(`/checkpoints/${id}`, checkpointData);
    return response.data.data;
};
