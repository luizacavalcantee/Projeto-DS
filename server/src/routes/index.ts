import { Router } from 'express';

import UserRouter from './UserRoutes';
import AuthRouter from './AuthRoutes';
import FileRouter from './FileRoutes';
import OngRouter from './OngRoutes';
import SchoolManagerRouter from './ManagerRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/ong', OngRouter);
router.use('/manager', SchoolManagerRouter);
router.use('/sessions', AuthRouter);
router.use('/file', FileRouter);
router.route('/').get((_, res) => {
  res.status(200).send('Projeto Desenvolvimento de Software Backend');
});

export default router;