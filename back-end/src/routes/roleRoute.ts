import { Router } from 'express';
import RoleController from '../controllers/RoleController';
import { authenticateToken } from '../middleware/auth';


const roleRoute = Router();
//roleRoute.use(authenticateToken); 

roleRoute.post('/', RoleController.create);
roleRoute.get('/', RoleController.showAll);
roleRoute.get('/:id', RoleController.getByID);
roleRoute.delete('/:id', RoleController.delete);
roleRoute.put('/:id', RoleController.update);

export default roleRoute;
