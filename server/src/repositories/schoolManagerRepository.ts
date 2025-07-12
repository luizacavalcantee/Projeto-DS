import { Prisma, SchoolManager } from '@prisma/client';
import prisma from '@database';

// --- CORREÇÃO 1: CRIANDO UM TIPO PRECISO E REUTILIZÁVEL ---
// Usamos o 'validator' do Prisma para definir um tipo que SEMPRE inclui a relação.
// Isto garante que o TypeScript saiba que 'schoolChallenges' existe.
const schoolManagerWithChallenges = Prisma.validator<Prisma.SchoolManagerDefaultArgs>()({
  include: {
    schoolChallenges: true,
  },
});

// Este é o nosso novo tipo: um SchoolManager com a propriedade schoolChallenges.
// Vamos usá-lo em todas as funções que retornam um gestor com os seus desafios.
type SchoolManagerWithChallenges = Prisma.SchoolManagerGetPayload<typeof schoolManagerWithChallenges>;


class SchoolManagerRepository {
    // Ajustamos os outros métodos para usar o novo tipo também, para consistência.
    async create(data: Prisma.SchoolManagerCreateInput): Promise<SchoolManagerWithChallenges> {
        return prisma.schoolManager.create({ data, ...schoolManagerWithChallenges });
    }

    async findById(id: number): Promise<SchoolManagerWithChallenges | null> {
        return prisma.schoolManager.findUnique({
            where: { id: id },
            ...schoolManagerWithChallenges // Usamos o nosso validador aqui
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
