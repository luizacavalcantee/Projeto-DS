import { Router } from 'express';
import { CheckpointController } from '@controllers';

const checkpointRouter = Router();

checkpointRouter.route('/:id')
    .patch(CheckpointController.update)
    .get(CheckpointController.readById);

export default checkpointRouter;