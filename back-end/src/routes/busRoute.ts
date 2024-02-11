import { Router } from 'express';
import BusController from '../controllers/BusController';
import { authenticateToken } from '../middleware/auth';

const busRoute = Router();

busRoute.use(authenticateToken); 

busRoute.post('/', BusController.create);
busRoute.get('/', BusController.showAll);
busRoute.get('/:id', BusController.showById);
busRoute.delete('/:id', BusController.delete);
busRoute.put('/:id', BusController.update);

export default busRoute;
