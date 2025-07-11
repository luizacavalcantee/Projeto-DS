import { Prisma, Checkpoint } from '@prisma/client';
import prisma from '@database';

class CheckpointRepository {
    async findById(id: number): Promise<Checkpoint | null> {
        return prisma.checkpoint.findUnique({
            where: { id },
        });
    }

    async findByChallengeId(challengeId: number): Promise<Checkpoint[]> {
        return prisma.checkpoint.findMany({
            where: { challengeId },
            orderBy: {
                checkpointNumber: 'asc',
            },
        });
    }

    async update(id: number, data: Prisma.CheckpointUpdateInput): Promise<Checkpoint> {
        return prisma.checkpoint.update({
            where: { id },
            data,
        });
    }
}

export default new CheckpointRepository();
