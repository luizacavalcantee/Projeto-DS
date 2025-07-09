import { Prisma, SchoolManager } from '@prisma/client';
import prisma from '@database';

class SchoolManagerRepository {
    async create(data: Prisma.SchoolManagerCreateInput): Promise<SchoolManager> {
        const schoolManager = await prisma.schoolManager.create({ data });
        return schoolManager;
    }

    async findById(id: number): Promise<SchoolManager | null> {
        const schoolManager = await prisma.schoolManager.findUnique({
            where: { id: id },
        });
        return schoolManager;
    }

    async findByEmail(email: string): Promise<SchoolManager | null> {
        const schoolManager = await prisma.schoolManager.findUnique({
            where: { email: email },
        });
        return schoolManager;
    }

    async findByInepCode(inepCode: string): Promise<SchoolManager | null> {
        const schoolManager = await prisma.schoolManager.findUnique({
            where: { inepCode: inepCode },
        });
        return schoolManager;
    }

    async findAll(): Promise<SchoolManager[]> {
        const schoolManagers = await prisma.schoolManager.findMany();
        return schoolManagers;
    }

    async update(id: number, data: Prisma.SchoolManagerUpdateInput): Promise<SchoolManager> {
        const schoolManager = await prisma.schoolManager.update({
            where: { id: id },
            data: data,
        });
        return schoolManager;
    }

    async delete(id: number): Promise<SchoolManager> {
        const schoolManager = await prisma.schoolManager.delete({
            where: { id: id },
        });
        return schoolManager;
    }
}

export default new SchoolManagerRepository();