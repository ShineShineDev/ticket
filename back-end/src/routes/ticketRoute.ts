import { Router } from 'express';
import TicketController from '../controllers/TicketController';
import { authenticateToken } from '../middleware/auth';

const ticketRoute = Router();
ticketRoute.use(authenticateToken); 

ticketRoute.post('/', TicketController.create);
ticketRoute.get('/', TicketController.showAll);
ticketRoute.get('/:id', TicketController.getByID);
ticketRoute.delete('/:id', TicketController.delete);
ticketRoute.put('/:id', TicketController.update);
ticketRoute.post('/add-review-message/:id', TicketController.addReviewMessage);
ticketRoute.get('/get/messages', TicketController.getMessages);
ticketRoute.put('/messages/read/:id', TicketController.read);

export default ticketRoute;
