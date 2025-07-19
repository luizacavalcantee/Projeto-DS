import { Request, Response, NextFunction } from 'express';
import { ChallengeRepository, OngRepository, SchoolManagerRepository } from '@repositories';
import { CreateChallengeDTO } from 'src/DTOs/Challenge';

class ChallengeController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { managerId, ...challengeDto }: CreateChallengeDTO = req.body;

      const ongExists = await OngRepository.findById(challengeDto.ongId);
      if (!ongExists) {
        return next({ status: 404, message: 'ONG não encontrada' });
      }

      const {
        checkpoint1Title,
        checkpoint2Title,
        checkpoint3Title,
        ongId,
        ...challengeData
      } = challengeDto;

      const dataForPrisma = {
        ...challengeData,
        ong: {
          connect: { id: ongId },
        },
        checkpoints: {
          create: [
            { title: checkpoint1Title, checkpointNumber: 1 },
            { title: checkpoint2Title, checkpointNumber: 2 },
            { title: checkpoint3Title, checkpointNumber: 3 },
          ],
        },
      };

      const challenge = await ChallengeRepository.create(dataForPrisma);

      res.locals = {
        status: 201,
        message: 'Desafio criado com sucesso e disponível para escolas',
        data: challenge,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const challenges = await ChallengeRepository.findAll();
      res.locals = {
        status: 200,
        data: challenges,
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const challenge = await ChallengeRepository.findById(Number(id));

      if (!challenge) {
        return next({ status: 404, message: 'Desafio não encontrado' });
      }

      res.locals = {
        status: 200,
        data: challenge,
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { schoolManagerId, ...challengeData } = req.body;

      const challengeExists = await ChallengeRepository.findById(Number(id));
      if (!challengeExists) {
        return next({ status: 404, message: 'Desafio não encontrado' });
      }

      const dataToUpdate: any = { ...challengeData };

      if (schoolManagerId) {
        if (challengeExists.managerId) {
          return next({ status: 409, message: 'Este desafio já foi aceito por outra escola.' });
        }

        const managerExists = await SchoolManagerRepository.findById(schoolManagerId);
        if (!managerExists) {
          return next({ status: 404, message: 'Gestor Escolar não encontrado' });
        }

        dataToUpdate.managerId = schoolManagerId;
      }

      const updatedChallenge = await ChallengeRepository.update(Number(id), dataToUpdate);

      res.locals = {
        status: 200,
        message: 'Desafio atualizado com sucesso',
        data: updatedChallenge,
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const challengeExists = await ChallengeRepository.findById(Number(id));

      if (!challengeExists) {
        return next({ status: 404, message: 'Desafio não encontrado' });
      }

      await ChallengeRepository.delete(Number(id));

      res.locals = {
        status: 200,
        message: 'Desafio deletado com sucesso',
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new ChallengeController();
