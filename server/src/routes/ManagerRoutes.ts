import { Router } from 'express';
import { SchoolManagerController } from '@controllers';

const schoolManagerRouter = Router();

schoolManagerRouter.route('/').post(SchoolManagerController.create);
schoolManagerRouter.route('/').get(SchoolManagerController.readAll);
schoolManagerRouter.route('/:id').get(SchoolManagerController.readById);
schoolManagerRouter.route('/:id').patch(SchoolManagerController.update);
schoolManagerRouter.route('/:id').delete(SchoolManagerController.delete);

export default schoolManagerRouter;
