import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { OngRepository } from '../repositories';

class OngController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const ongData = req.body;

      const existsOngWithEmail = await OngRepository.findByEmail(ongData.email);

      if (existsOngWithEmail) {
        return next({
          status: 400,
          message: 'This email is already registered',
        });
      }

      const ong = await OngRepository.create(ongData);

      res.locals = {
        status: 201,
        message: 'Ong created',
        data: ong,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const ong = await OngRepository.findById(Number(id));

      if (!ong) {
        return next({
          status: 404,
          message: 'Ong not found',
        });
      }

      res.locals = {
        status: 200,
        data: ong,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const ongs = await OngRepository.findAll();

      res.locals = {
        status: 200,
        data: ongs,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const ongData = req.body;

      const ongExists = await OngRepository.findById(Number(id));

      if (!ongExists) {
        return next({
          status: 404,
          message: 'Ong not found',
        });
      }

      const updatedOng = await OngRepository.update(Number(id), ongData);

      res.locals = {
        status: 200,
        message: 'Ong updated',
        data: updatedOng,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const ongExists = await OngRepository.findById(Number(id));

      if (!ongExists) {
        return next({
          status: 404,
          message: 'Ong not found',
        });
      }

      await OngRepository.delete(Number(id));

      res.locals = {
        status: 200,
        message: 'Ong deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new OngController();
