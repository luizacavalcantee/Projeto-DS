import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { OngRepository, SchoolManagerRepository, TokenRepository, CookieRepository } from '@repositories';
import { Ong, SchoolManager } from '@prisma/client';

class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // O frontend agora deve enviar 'userType' para sabermos quem está tentando logar
      const { email, password, userType } = req.body;

      if (!userType || (userType !== 'ong' && userType !== 'manager')) {
        return next({
          status: 400,
          message: 'User type "ong" or "manager" is required.',
        });
      }

      let user: Ong | SchoolManager | null = null;

      // Busca no repositório correto com base no userType
      if (userType === 'ong') {
        user = await OngRepository.findByEmail(email);
      } else {
        user = await SchoolManagerRepository.findByEmail(email);
      }

      if (!user) {
        return next({ status: 400, message: 'Invalid credentials.' });
      }

      const checkPassword = await compare(password, user.password);

      if (!checkPassword) {
        return next({ status: 400, message: 'Invalid credentials.' });
      }

      // IMPORTANTE: Adicione o userType ao token para saber quem recarregar depois
      const accessToken = TokenRepository.generateAccessToken({ id: user.id, type: userType }, '60s');
      const refreshToken = TokenRepository.generateRefreshToken({ id: user.id, type: userType }, '5d');

      CookieRepository.setCookie(res, 'refresh_token', refreshToken);

      // Remove a senha do objeto antes de enviar
      const { password: _, ...loggedUser } = user;

      res.locals = {
        status: 200,
        message: 'User logged in',
        data: {
          loggedUser,
          accessToken,
        },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return next({ status: 401, message: 'Refresh token not found' });
        }

        // Assumindo que o verifyRefreshToken retorna o payload { id, type }
        const decoded = TokenRepository.verifyRefreshToken(refreshToken) as { id: number; type: 'ong' | 'manager' };
        if (!decoded || !decoded.id || !decoded.type) {
            return next({ status: 401, message: 'Invalid refresh token' });
        }

        let user: Ong | SchoolManager | null = null;
        if (decoded.type === 'ong') {
            user = await OngRepository.findById(decoded.id);
        } else {
            user = await SchoolManagerRepository.findById(decoded.id);
        }

        if (!user) {
            return next({ status: 404, message: 'User not found' });
        }

        // Gera novos tokens
        const newAccessToken = TokenRepository.generateAccessToken({ id: user.id, type: decoded.type }, '60s');
        const newRefreshToken = TokenRepository.generateRefreshToken({ id: user.id, type: decoded.type }, '5d');

        CookieRepository.setCookie(res, 'refresh_token', newRefreshToken);

        const { password: _, ...loggedUser } = user;

        res.locals = {
            status: 200,
            message: 'Token refreshed',
            data: {
                loggedUser,
                accessToken: newAccessToken, // Corrigido para accessToken
            },
        };

        return next();
    } catch (error) {
        return next(error);
    }
  }

  // O método de logout permanece o mesmo, está correto.
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      CookieRepository.clearCookies(res, 'refresh_token');
      delete req.headers.authorization;
      res.locals = { status: 200, message: 'User logged out' };
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new LoginController();
