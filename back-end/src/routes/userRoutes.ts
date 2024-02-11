import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const userRouter = Router();

userRouter.use(authenticateToken); 

export default userRouter;
