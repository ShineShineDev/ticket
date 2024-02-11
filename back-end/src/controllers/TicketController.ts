import { Request, Response } from 'express';
import { createConnection, FindOneOptions, FindOperator, getRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Ticket } from '../models/Ticket';


class TicketController {

	async create(req: Request, res: Response) {
		try {
			console.log(req.body);
			const { busId, routeId, passengerId, seatNumber, departureDate, price, details, status } = req.body;

			const ticketRepository = getRepository(Ticket);

			const ticket = plainToClass(Ticket, {
				busId: busId,
				routeId: routeId,
				passengerId: passengerId,
				seatNumber,
				departureDate: new Date(departureDate),
				price,
				details,
				status: "Pending"
			});

			const errors = await validate(ticket);

			if (errors.length > 0) {
				res.status(400).json({ errors });
				return;
			}
			console.log(ticket);

			const newTicket = await ticketRepository.save(ticket);

			res.status(201).json(newTicket);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}

	async showAll(req: Request, res: Response) {
		try {
			const ticketRepository = getRepository(Ticket);
			const tickets = await ticketRepository.find({ relations: ['bus'] });
			res.json(tickets);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}

	async getByID(req: Request, res: Response) {
		try {
			const ticketRepository = getRepository(Ticket);
			const id = req.params.id;
			const ticket = await ticketRepository.findOne({ _id: new ObjectId(id) } as FindOneOptions<Ticket>);


			if (!ticket) {
				res.status(404).json({ error: 'Ticket not found' });
				return;
			}

			res.json(ticket);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const {
				busId,
				routeId,
				passengerId,
				seatNumber,
				departureDate,
				price,
				details,
				status,
				reviewMessage,
			} = req.body;

			const ticketRepository = getRepository(Ticket);

			const ticket = await ticketRepository.findOne({ _id: new ObjectId(id) } as FindOneOptions<Ticket>);

			if (!ticket) {
				res.status(404).json({ error: 'Ticket not found' });
				return;
			}


			ticket.busId = new ObjectId(busId);
			ticket.routeId = new ObjectId(routeId);
			ticket.passengerId = new ObjectId(passengerId);
			ticket.seatNumber = seatNumber;
			ticket.departureDate = new Date(departureDate);
			ticket.price = price;
			ticket.details = details;
			ticket.status = status;
			ticket.reviewMessage = reviewMessage;

			const updatedTicket = await ticketRepository.save(ticket);

			res.json(updatedTicket);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const id = req.params.id;

			const ticketRepository = getRepository(Ticket);
			const ticket = await ticketRepository.findOne({ _id: new ObjectId(id) } as FindOneOptions<Ticket>);

			if (!ticket) {
				res.status(404).json({ error: 'Ticket not found' });
				return;
			}

			await ticketRepository.remove(ticket);

			res.json({ message: 'Ticket deleted successfully' });
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}

	async addReviewMessage(req: Request, res: Response) {
		const id = req.params.id;
		console.log(id);
		console.log(req.body.message);
		const ticketRepository = getRepository(Ticket);

		const ticket = await ticketRepository.findOne({ _id: new ObjectId(id) } as FindOneOptions<Ticket>);

		if (!ticket) {
			res.status(404).json({ error: 'Ticket not found' });
			return;
		}
		ticket.reviewMessage = req.body.message
		const updatedTicket = await ticketRepository.save(ticket);
		res.json({ message: 'Message Update successfully' });
	}

	async getMessages(req: Request, res: Response) {
		try {
			const ticketRepository = getRepository(Ticket);
			const tickets = await ticketRepository.find(
				{
					where: { reviewMessage: <FindOperator<string>><unknown>{ $ne: null } }
				}
			);
			res.json(tickets);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
	async read(req: Request, res: Response) {
		const id = req.params.id;
		console.log(id);
		console.log(req.body.message);
		const ticketRepository = getRepository(Ticket);

		const ticket = await ticketRepository.findOne({ _id: new ObjectId(id) } as FindOneOptions<Ticket>);

		if (!ticket) {
			res.status(404).json({ error: 'Ticket not found' });
			return;
		}
		ticket.reviewMessage = null;
		const updatedTicket = await ticketRepository.save(ticket);
		res.json({ message: 'Message Read ' });
	}
}

export default new TicketController();
