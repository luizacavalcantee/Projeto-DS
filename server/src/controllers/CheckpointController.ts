import { Request, Response, NextFunction } from 'express';
import { CheckpointRepository } from '@repositories';

class CheckpointController {
  /**
   * Atualiza um checkpoint, usado para marcar a conclusão de uma etapa.
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const checkpointData = req.body;

      const checkpointExists = await CheckpointRepository.findById(Number(id));
      if (!checkpointExists) {
        return next({ status: 404, message: 'Checkpoint não encontrado' });
      }

      const updatedCheckpoint = await CheckpointRepository.update(Number(id), checkpointData);

      res.locals = {
        status: 200,
        message: 'Checkpoint atualizado com sucesso',
        data: updatedCheckpoint,
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Busca um checkpoint específico pelo ID.
   */
  async readById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const checkpoint = await CheckpointRepository.findById(Number(id));

      if (!checkpoint) {
        return next({ status: 404, message: 'Checkpoint não encontrado' });
      }

      res.locals = {
        status: 200,
        data: checkpoint,
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new CheckpointController();