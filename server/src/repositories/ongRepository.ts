import { Prisma, Ong } from '@prisma/client';
import prisma from '@database';

class OngRepository {
  async create(data: Prisma.OngCreateInput): Promise<Ong> {
    const ong = await prisma.ong.create({ data });
    return ong;
  }

  async findById(id: number): Promise<Ong | null> {
    const ongs = await prisma.ong.findUnique({
      where: {
        id: id
      }
    })
    return ongs;
  }

  async findByEmail(email: string): Promise<Ong | null> {
    const ong = await prisma.ong.findUnique({
      where: {
        email: email
      }
    });
    return ong;
  }

  async findAll(): Promise<Ong[]> {
    const ongs = await prisma.ong.findMany();
    return ongs;
  }

  async update(id: number, data: Prisma.OngUpdateInput): Promise<Ong> {
    const ong = await prisma.ong.update({
      where: { id: id },
      data: data
    });
    return ong;
  }

  async delete(id: number): Promise<Ong> {
    const ong = await prisma.ong.delete({
      where: { id: id }
    });
    return ong;
  }
}
export default new OngRepository();
