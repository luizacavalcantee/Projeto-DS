import { Request, Response, NextFunction } from 'express';
import { ChallengeRepository } from '../repositories';
import { Challenge, UpdateChallenge } from '../DTOs';

class ChallengeController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const challengeData = Challenge.parse(req.body);

      const challenge = await ChallengeRepository.create(challengeData);

      res.locals = {
        status: 201,
        message: 'Challenge created',
        data: challenge,
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
        return next({
          status: 404,
          message: 'Challenge not found',
        });
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

  async readByOng(req: Request, res: Response, next: NextFunction) {
    try {
      const { ongId } = req.params;

      const challenges = await ChallengeRepository.findByOngId(Number(ongId));

      res.locals = {
        status: 200,
        data: challenges,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readByManager(req: Request, res: Response, next: NextFunction) {
    try {
      const { managerId } = req.params;

      const challenges = await ChallengeRepository.findByManagerId(Number(managerId));

      res.locals = {
        status: 200,
        data: challenges,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readByStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.params;

      const challenges = await ChallengeRepository.findByStatus(status as any);

      res.locals = {
        status: 200,
        data: challenges,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.params;

      const challenges = await ChallengeRepository.findByCategory(category as any);

      res.locals = {
        status: 200,
        data: challenges,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const challengeData = UpdateChallenge.parse(req.body);

      const challengeExists = await ChallengeRepository.findById(Number(id));

      if (!challengeExists) {
        return next({
          status: 404,
          message: 'Challenge not found',
        });
      }

      const updatedChallenge = await ChallengeRepository.update(Number(id), challengeData);

      res.locals = {
        status: 200,
        message: 'Challenge updated',
        data: updatedChallenge,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const challengeExists = await ChallengeRepository.findById(Number(id));

      if (!challengeExists) {
        return next({
          status: 404,
          message: 'Challenge not found',
        });
      }

      const updatedChallenge = await ChallengeRepository.updateStatus(Number(id), status);

      res.locals = {
        status: 200,
        message: 'Challenge status updated',
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
        return next({
          status: 404,
          message: 'Challenge not found',
        });
      }

      await ChallengeRepository.delete(Number(id));

      res.locals = {
        status: 200,
        message: 'Challenge deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new ChallengeController();
