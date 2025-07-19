import { Prisma, SchoolManager } from '@prisma/client';
import prisma from '@database';

const schoolManagerWithChallenges =
  Prisma.validator<Prisma.SchoolManagerDefaultArgs>()({
    include: {
      schoolChallenges: true,
    },
  });

type SchoolManagerWithChallenges = Prisma.SchoolManagerGetPayload<
  typeof schoolManagerWithChallenges
>;

class SchoolManagerRepository {
  async create(
    data: Prisma.SchoolManagerCreateInput,
  ): Promise<SchoolManagerWithChallenges> {
    return prisma.schoolManager.create({
      data: data,
      include: {
        schoolChallenges: true,
      },
    });
  }

  async findById(id: number): Promise<SchoolManagerWithChallenges | null> {
    return prisma.schoolManager.findUnique({
      where: { id: id },
      ...schoolManagerWithChallenges,
    });
  }

  async findByEmail(
    email: string,
  ): Promise<SchoolManagerWithChallenges | null> {
    return prisma.schoolManager.findUnique({
      where: { email: email },
      ...schoolManagerWithChallenges, // E aqui
    });
  }

  async findByInepCode(
    inepCode: string,
  ): Promise<SchoolManagerWithChallenges | null> {
    return prisma.schoolManager.findUnique({
      where: { inepCode: inepCode },
      ...schoolManagerWithChallenges, // E aqui
    });
  }

  async findAll(): Promise<SchoolManagerWithChallenges[]> {
    return prisma.schoolManager.findMany(schoolManagerWithChallenges);
  }

  async update(
    id: number,
    data: Prisma.SchoolManagerUpdateInput,
  ): Promise<SchoolManagerWithChallenges> {
    return prisma.schoolManager.update({
      where: { id: id },
      data: data,
      ...schoolManagerWithChallenges, // E finalmente aqui
    });
  }

  async delete(id: number): Promise<SchoolManager> {
    return prisma.schoolManager.delete({ where: { id: id } });
  }
}

export default new SchoolManagerRepository();
