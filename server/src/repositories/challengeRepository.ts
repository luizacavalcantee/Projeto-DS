import { PrismaClient, Challenge, ChallengeCategory, TeachingStage, ChallengeStatus, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateChallengeData {
  title: string;
  location?: string;
  description: string;
  startDate: Date;
  endDate: Date;
  contactName: string;
  contactPhone: string;
  idealAge: TeachingStage[];
  neededResources: string;
  category: ChallengeCategory;
  documentUrls?: string[];
  photoUrl: string;
  status?: ChallengeStatus;
  ongId: number;
  managerId: number;
}

interface UpdateChallengeData {
  title?: string;
  location?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  contactName?: string;
  contactPhone?: string;
  idealAge?: TeachingStage[];
  neededResources?: string;
  category?: ChallengeCategory;
  documentUrls?: string[];
  photoUrl?: string;
  status?: ChallengeStatus;
}

class ChallengeRepository {
  async create(data: CreateChallengeData): Promise<Challenge> {
    const challenge = await prisma.challenge.create({
      data: {
        ...data,
        // Create default checkpoints (always 3)
        checkpoints: {
          create: [
            { title: 'Checkpoint 1', checkpointNumber: 1 },
            { title: 'Checkpoint 2', checkpointNumber: 2 },
            { title: 'Checkpoint 3', checkpointNumber: 3 }
          ]
        }
      },
      include: {
        checkpoints: true,
        ong: true,
        schoolManager: true
      }
    });

    return challenge;
  }

  async findById(id: number): Promise<Challenge | null> {
    return prisma.challenge.findUnique({
      where: { id },
      include: {
        checkpoints: true,
        ong: true,
        schoolManager: true
      }
    });
  }

  async findAll(): Promise<Challenge[]> {
    return prisma.challenge.findMany({
      include: {
        checkpoints: true,
        ong: true,
        schoolManager: true
      }
    });
  }

  async findByOngId(ongId: number): Promise<Challenge[]> {
    return prisma.challenge.findMany({
      where: { ongId },
      include: {
        checkpoints: true,
        ong: true,
        schoolManager: true
      }
    });
  }

  async findByManagerId(managerId: number): Promise<Challenge[]> {
    return prisma.challenge.findMany({
      where: { managerId },
      include: {
        checkpoints: true,
        ong: true,
        schoolManager: true
      }
    });
  }

  async findByStatus(status: ChallengeStatus): Promise<Challenge[]> {
    return prisma.challenge.findMany({
      where: { status },
      include: {
        checkpoints: true,
        ong: true,
        schoolManager: true
      }
    });
  }

  async findByCategory(category: ChallengeCategory): Promise<Challenge[]> {
    return prisma.challenge.findMany({
      where: { category },
      include: {
        checkpoints: true,
        ong: true,
        schoolManager: true
      }
    });
  }

  async update(id: number, data: UpdateChallengeData): Promise<Challenge> {
    return prisma.challenge.update({
      where: { id },
      data,
      include: {
        checkpoints: true,
        ong: true,
        schoolManager: true
      }
    });
  }

  async updateStatus(id: number, status: ChallengeStatus): Promise<Challenge> {
    return prisma.challenge.update({
      where: { id },
      data: { status },
      include: {
        checkpoints: true,
        ong: true,
        schoolManager: true
      }
    });
  }

  async delete(id: number): Promise<void> {
    // First delete related checkpoints
    await prisma.checkpoint.deleteMany({
      where: { challengeId: id }
    });
    
    // Then delete the challenge
    await prisma.challenge.delete({
      where: { id }
    });
  }
}

export default new ChallengeRepository();
