import { NextFunction, Request, Response } from 'express';
import { SchoolManagerRepository } from '@repositories';

class RankingController {
  /**
   * Calcula e retorna o ranking das escolas com base no número de desafios concluídos.
   */
  async getSchoolRanking(req: Request, res: Response, next: NextFunction) {
    try {
      // Busca todos os gestores e inclui seus desafios
      const allManagers = await SchoolManagerRepository.findAll();

      // Mapeia os gestores para um formato de ranking, calculando os desafios concluídos
      const rankedSchools = allManagers.map(manager => {
        const completedChallengesCount = manager.schoolChallenges?.filter(
          challenge => challenge.status === 'COMPLETED'
        ).length || 0;

        return {
          id: manager.id,
          schoolName: manager.schoolName,
          schoolImageUrl: manager.schoolImageUrl,
          completedChallengesCount: completedChallengesCount,
        };
      });

      // Ordena as escolas em ordem decrescente pelo número de desafios concluídos
      rankedSchools.sort((a, b) => b.completedChallengesCount - a.completedChallengesCount);

      res.locals = {
        status: 200,
        data: rankedSchools,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new RankingController();
