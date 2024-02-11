import { Router } from 'express';
import PassengerController from '../controllers/PassengerController';
import { authenticateToken } from '../middleware/auth';

const passengerRoute = Router();

passengerRoute.use(authenticateToken); 

passengerRoute.post('/', PassengerController.create);
passengerRoute.get('/', PassengerController.showAll);
passengerRoute.get('/:id', PassengerController.showById);
passengerRoute.delete('/:id', PassengerController.delete);
passengerRoute.put('/:id', PassengerController.update);

export default passengerRoute;
