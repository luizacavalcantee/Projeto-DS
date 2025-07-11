import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { SchoolManagerRepository } from '@repositories';

class SchoolManagerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const managerData = req.body;

      const existsManagerWithEmail = await SchoolManagerRepository.findByEmail(managerData.email);
      if (existsManagerWithEmail) {
        return next({
          status: 400,
          message: 'Este e-mail já está cadastrado',
        });
      }

      const existsManagerWithInep = await SchoolManagerRepository.findByInepCode(managerData.inepCode);
      if (existsManagerWithInep) {
        return next({
          status: 400,
          message: 'Este código INEP já está cadastrado',
        });
      }

      const hashedPassword = await hash(managerData.password, 8);
      managerData.password = hashedPassword;

      const manager = await SchoolManagerRepository.create(managerData);

      res.locals = {
        status: 201,
        message: 'Gestor escolar criado com sucesso',
        data: manager,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Busca um gestor escolar pelo ID.
   */
  async readById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const manager = await SchoolManagerRepository.findById(Number(id));

      if (!manager) {
        return next({
          status: 404,
          message: 'Gestor escolar não encontrado',
        });
      }

      res.locals = {
        status: 200,
        data: manager,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Lista todos os gestores escolares.
   */
  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const managers = await SchoolManagerRepository.findAll();

      res.locals = {
        status: 200,
        data: managers,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Atualiza um gestor escolar.
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const managerData = req.body;

      const managerExists = await SchoolManagerRepository.findById(Number(id));

      if (!managerExists) {
        return next({
          status: 404,
          message: 'Gestor escolar não encontrado',
        });
      }

      // Se a senha for atualizada, criptografa a nova senha
      if (managerData.password) {
        managerData.password = await hash(managerData.password, 8);
      }

      const updatedManager = await SchoolManagerRepository.update(Number(id), managerData);

      res.locals = {
        status: 200,
        message: 'Gestor escolar atualizado com sucesso',
        data: updatedManager,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Deleta um gestor escolar.
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const managerExists = await SchoolManagerRepository.findById(Number(id));

      if (!managerExists) {
        return next({
          status: 404,
          message: 'Gestor escolar não encontrado',
        });
      }

      await SchoolManagerRepository.delete(Number(id));

      res.locals = {
        status: 200,
        message: 'Gestor escolar deletado com sucesso',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new SchoolManagerController();