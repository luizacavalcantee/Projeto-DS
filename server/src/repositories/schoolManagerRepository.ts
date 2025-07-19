import { Prisma, SchoolManager } from '@prisma/client';
import prisma from '@database';

const schoolManagerWithChallenges = Prisma.validator<Prisma.SchoolManagerDefaultArgs>()({
  include: {
    schoolChallenges: true,
  },
});

type SchoolManagerWithChallenges = Prisma.SchoolManagerGetPayload<typeof schoolManagerWithChallenges>;


class SchoolManagerRepository {
    async create(data: Prisma.SchoolManagerCreateInput): Promise<SchoolManagerWithChallenges> {
    // Adicione este console.log para depurar e ver o que está chegando aqui
    console.log('DADOS RECEBIDOS PELO REPOSITÓRIO:', data);

    // A chamada correta ao Prisma. Note que passamos o objeto `data` dentro de outro objeto.
    return prisma.schoolManager.create({
            data: data, // Passamos o objeto de dados aqui
            include: {  // E definimos o 'include' de forma explícita
                schoolChallenges: true,
            },
        });
  }

    async findByEmail(email: string): Promise<SchoolManagerWithChallenges | null> {
        return prisma.schoolManager.findUnique({
            where: { email: email },
            ...schoolManagerWithChallenges // E aqui
        });
    }

    async findByInepCode(inepCode: string): Promise<SchoolManagerWithChallenges | null> {
        return prisma.schoolManager.findUnique({
            where: { inepCode: inepCode },
            ...schoolManagerWithChallenges // E aqui
        });
    }

    // --- CORREÇÃO 2: ATUALIZANDO A ASSINATURA DO MÉTODO findAll ---
    // Agora, a função promete retornar um array do nosso novo tipo, que é o correto.
    async findAll(): Promise<SchoolManagerWithChallenges[]> {
        return prisma.schoolManager.findMany(schoolManagerWithChallenges);
    }

    async update(id: number, data: Prisma.SchoolManagerUpdateInput): Promise<SchoolManagerWithChallenges> {
        return prisma.schoolManager.update({
            where: { id: id },
            data: data,
            ...schoolManagerWithChallenges // E finalmente aqui
        });
    }

    async delete(id: number): Promise<SchoolManager> {
        return prisma.schoolManager.delete({ where: { id: id } });
    }
}

export default new SchoolManagerRepository();
