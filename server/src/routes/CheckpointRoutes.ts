import { Router } from 'express';
import { CheckpointController } from '@controllers';
// import { UpdateCheckpoint } from '@dtos';

const checkpointRouter = Router();

// A validação será de responsabilidade do controller
checkpointRouter.route('/:id')
    .patch(CheckpointController.update) // Sem o middleware validate
    .get(CheckpointController.readById);

export default checkpointRouter;