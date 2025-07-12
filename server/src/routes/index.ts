import { Router } from 'express';

import AuthRouter from './AuthRoutes';
import FileRouter from './FileRoutes';
import OngRouter from './OngRoutes';
import SchoolManagerRouter from './schoolManagerRoutes';
import ChallengeRouter from './ChallengeRoutes';
import CheckpointRouter from './CheckpointRoutes';
const router = Router();

router.use('/ong', OngRouter);
router.use('/manager', SchoolManagerRouter);
router.use('/sessions', AuthRouter);
router.use('/file', FileRouter);

router.use('/challenges', ChallengeRouter);
router.use('/checkpoints', CheckpointRouter);

router.route('/').get((_, res) => {
  res.status(200).send('Projeto Desenvolvimento de Software Backend');
});

export default router;