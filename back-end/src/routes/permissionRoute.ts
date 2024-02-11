import { Router } from 'express';
import PermissionController from '../controllers/PermissionController';
import { authenticateToken } from '../middleware/auth';

const permissionRouter = Router();
permissionRouter.use(authenticateToken); 

permissionRouter.post('/', PermissionController.create);
permissionRouter.get('/', PermissionController.showAll);
permissionRouter.get('/:id', PermissionController.getByID);
permissionRouter.delete('/:id', PermissionController.delete);
permissionRouter.put('/:id', PermissionController.update);

export default permissionRouter;
