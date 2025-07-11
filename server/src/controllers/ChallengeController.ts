import { Request, Response, NextFunction } from 'express';
import { ChallengeRepository, OngRepository, SchoolManagerRepository } from '@repositories';
import { CreateChallengeDTO } from 'src/DTOs/Challenge';

class ChallengeController {
  /**
   * Cria um novo desafio e seus 3 checkpoints iniciais.
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const challengeDto: CreateChallengeDTO = req.body;

      // Validações (estão corretas)
      const ongExists = await OngRepository.findById(challengeDto.ongId);
      if (!ongExists) {
        return next({ status: 404, message: 'ONG não encontrada' });
      }

      const managerExists = await SchoolManagerRepository.findById(challengeDto.managerId);
      if (!managerExists) {
        return next({ status: 404, message: 'Gestor Escolar não encontrado' });
      }

      // Desestrutura todos os campos do DTO
      const {
        checkpoint1Title,
        checkpoint2Title,
        checkpoint3Title,
        ongId,         // <-- Pega o ID da ONG
        managerId,     // <-- Pega o ID do Gestor
        ...challengeData // <-- Pega o restante dos dados (title, description, etc.)
      } = challengeDto;

      // ✅ CORREÇÃO APLICADA AQUI
      const dataForPrisma = {
        ...challengeData, // Espalha os dados escalares (title, description, etc.)
        
        // Conecta as relações usando os IDs
        ong: {
          connect: { id: ongId }
        },
        schoolManager: {
          connect: { id: managerId }
        },

        // Cria os checkpoints aninhados (isso já estava correto)
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
        message: 'Desafio criado com sucesso',
        data: challenge,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

/**
   * Lista todos os desafios.
   */
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

  /**
   * Busca um desafio pelo ID.
   */
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

  /**
   * Atualiza um desafio.
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const challengeData = req.body;

      const challengeExists = await ChallengeRepository.findById(Number(id));
      if (!challengeExists) {
        return next({ status: 404, message: 'Desafio não encontrado' });
      }

      const updatedChallenge = await ChallengeRepository.update(Number(id), challengeData);

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

  /**
   * Deleta um desafio.
   */
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