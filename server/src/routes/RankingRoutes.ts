import { Router } from 'express';
import { RankingController } from '@controllers';

const rankingRouter = Router();

rankingRouter.route('/').get(RankingController.getSchoolRanking);

export default rankingRouter;
