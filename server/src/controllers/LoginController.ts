import { NextFunction, Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';
import axios from 'axios';
import {
  OngRepository,
  SchoolManagerRepository,
  TokenRepository,
  CookieRepository,
} from '@repositories';
import { Ong, SchoolManager } from '@prisma/client';

const PREFEITURA_API_URL = 'https://bora-impactar-dev.setd.rdmapps.com.br/api/login';

class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, userType } = req.body;

      if (!userType || (userType !== 'ong' && userType !== 'manager')) {
        return next({
          status: 400,
          message: 'User type "ong" or "manager" is required.',
        });
      }

      let user: Ong | SchoolManager | null = null;

      if (userType === 'manager') {
        user = await SchoolManagerRepository.findByEmail(email);
        if (!user || !(await compare(password, user.password))) {
          return next({ status: 401, message: 'Invalid credentials.' });
        }
      }

      if (userType === 'ong') {
        let prefeituraData;
        
        try {
          const apiResponse = await axios.post(PREFEITURA_API_URL, { email, password });
          prefeituraData = apiResponse.data;
        } catch (error) {
          return next({ status: 401, message: 'Invalid credentials provided to external service.' });
        }
        
        if (!prefeituraData || !prefeituraData.ngo) {
            return next({ status: 500, message: 'Invalid response from external service.' });
        }
        
        const ongDataFromApi = prefeituraData.ngo;
        const passwordHash = await hash(password, 10);

        const existingOng = await OngRepository.findByEmail(email);

        if (existingOng) {
          user = await OngRepository.update(existingOng.id, {
            name: ongDataFromApi.name,
            description: ongDataFromApi.description,
            contactPhone: ongDataFromApi.contact_phone,
            instagramLink: ongDataFromApi.instagram_link,
            facebookLink: ongDataFromApi.facebook_link,
            site: ongDataFromApi.site,
            logoPhotoUrl: ongDataFromApi.logo_photo_url,
            password: passwordHash,
          });
        } else {
          user = await OngRepository.create({
            email: email,
            password: passwordHash,
            name: ongDataFromApi.name,
            description: ongDataFromApi.description,
            contactPhone: ongDataFromApi.contact_phone,
            instagramLink: ongDataFromApi.instagram_link,
            facebookLink: ongDataFromApi.facebook_link,
            site: ongDataFromApi.site,
            logoPhotoUrl: ongDataFromApi.logo_photo_url,
          });
        }
      }

      if (!user) {
        return next({ status: 500, message: 'Failed to process user login.' });
      }

      const accessToken = TokenRepository.generateAccessToken({ id: user.id, type: userType }, '60s');
      const refreshToken = TokenRepository.generateRefreshToken({ id: user.id, type: userType }, '5d');

      CookieRepository.setCookie(res, 'refresh_token', refreshToken);

      const { password: _, ...loggedUser } = user;

      res.locals = {
        status: 200,
        message: 'User logged in',
        data: { loggedUser, accessToken },
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

        const newAccessToken = TokenRepository.generateAccessToken({ id: user.id, type: decoded.type }, '60s');
        const newRefreshToken = TokenRepository.generateRefreshToken({ id: user.id, type: decoded.type }, '5d');

        CookieRepository.setCookie(res, 'refresh_token', newRefreshToken);

        const { password: _, ...loggedUser } = user;

        res.locals = {
            status: 200,
            message: 'Token refreshed',
            data: {
                loggedUser,
                accessToken: newAccessToken,
            },
        };

        return next();
    } catch (error) {
        return next(error);
    }
  }

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