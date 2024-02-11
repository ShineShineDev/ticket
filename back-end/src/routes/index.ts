import { Router } from 'express';
import authRouter from './authRoute';
import userRouter from './userRoutes';
import ticketRoute from './ticketRoute';
import roleRoute from './roleRoute';
import permissionRouter from './permissionRoute';
import busRoute from './busRoute';
import wayRoute from './wayRoute';
import passengerRoute from './passengerRoute';

const router = Router();
router.use('/auth', authRouter);
router.use('/tickets', ticketRoute);
router.use('/roles', roleRoute)
router.use('/permissions', permissionRouter)
router.use('/bus', busRoute)
router.use('/users', userRouter);
router.use('/ways', wayRoute);
router.use('/passengers', passengerRoute);

export default router;
