import { Prisma, Challenge } from '@prisma/client';
import prisma from '@database';

class ChallengeRepository {
    async create(data: Prisma.ChallengeCreateInput): Promise<Challenge> {
        return prisma.challenge.create({
            data,
            include: {
                checkpoints: true,
            },
        });
    }

    async findById(id: number): Promise<Challenge | null> {
        return prisma.challenge.findUnique({
            where: { id },
            include: {
                checkpoints: { orderBy: { checkpointNumber: 'asc' } },
                ong: true,
                schoolManager: true,
            },
        });
    }

    async findAll(): Promise<Challenge[]> {
        return prisma.challenge.findMany({
            include: {
                checkpoints: { orderBy: { checkpointNumber: 'asc' } },
                ong: true,
                schoolManager: true,
            },
        });
    }

    async update(id: number, data: Prisma.ChallengeUpdateInput): Promise<Challenge> {
        return prisma.challenge.update({
            where: { id },
            data,
            include: {
                checkpoints: true,
            },
        });
    }

    async delete(id: number): Promise<Challenge> {
        const transaction = await prisma.$transaction([
            prisma.checkpoint.deleteMany({ where: { challengeId: id } }),
            prisma.challenge.delete({ where: { id } }),
        ]);
        return transaction[1];
    }
}

export default new ChallengeRepository();
