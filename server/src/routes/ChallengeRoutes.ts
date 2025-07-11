import { Router } from 'express';
import { ChallengeController } from '@controllers';

const challengeRouter = Router();

// A validação dos dados do body será de responsabilidade do controller
challengeRouter.route('/')
    .post(ChallengeController.create);

challengeRouter.route('/')
    .get(ChallengeController.readAll);

challengeRouter.route('/:id')
    .get(ChallengeController.readById)
    .patch(ChallengeController.update) // Sem o middleware validate
    .delete(ChallengeController.delete);

export default challengeRouter;