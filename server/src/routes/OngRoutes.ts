import { Router } from 'express';
import { OngController } from '@controllers';

const ongRouter = Router();

ongRouter.route('/').post(OngController.create);
ongRouter.route('/').get(OngController.readAll);
ongRouter.route('/:id').get(OngController.readById);
ongRouter.route('/:id').patch(OngController.update);
ongRouter.route('/:id').delete(OngController.delete);

export default ongRouter;
