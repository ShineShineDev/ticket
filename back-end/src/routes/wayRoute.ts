import { Router } from 'express';
import WayController from '../controllers/WayController';
import { authenticateToken } from '../middleware/auth';

const wayRoute = Router();
wayRoute.use(authenticateToken); 

wayRoute.post('/', WayController.create);
wayRoute.get('/', WayController.showAll);
wayRoute.get('/:id', WayController.showById);
wayRoute.delete('/:id', WayController.delete);
wayRoute.put('/:id', WayController.update);

export default wayRoute;
