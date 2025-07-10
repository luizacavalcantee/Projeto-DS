import { Router } from 'express';
import { ChallengeController } from '../controllers';
import auth from '../middlewares/auth';

const challengeRouter = Router();

// Create a new challenge
challengeRouter.route('/')
  .post(
    [auth],
    ChallengeController.create
  );

// Get all challenges
challengeRouter.route('/')
  .get(
    ChallengeController.readAll
  );

// Get challenge by ID
challengeRouter.route('/:id')
  .get(
    ChallengeController.readById
  );

// Update a challenge
challengeRouter.route('/:id')
  .patch(
    [auth],
    ChallengeController.update
  );

// Delete a challenge
challengeRouter.route('/:id')
  .delete(
    [auth],
    ChallengeController.delete
  );

// Update only the status of a challenge
challengeRouter.route('/:id/status')
  .patch(
    [auth],
    ChallengeController.updateStatus
  );

// Get challenges by ONG ID
challengeRouter.route('/ong/:ongId')
  .get(
    ChallengeController.readByOng
  );

// Get challenges by Manager ID
challengeRouter.route('/manager/:managerId')
  .get(
    ChallengeController.readByManager
  );

// Get challenges by status
challengeRouter.route('/status/:status')
  .get(
    ChallengeController.readByStatus
  );

// Get challenges by category
challengeRouter.route('/category/:category')
  .get(
    ChallengeController.readByCategory
  );

export default challengeRouter;
