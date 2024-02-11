import { Request, Response } from 'express';
import { getRepository, FindOneOptions } from 'typeorm';
import { Route } from '../models/Route';
import { validate } from 'class-validator';
import { ObjectId } from 'mongodb';

class WayController {

	async create(req: Request, res: Response) {
		try {
			console.log(req.body);
			const routeRepository = getRepository(Route);
			const { departureLocation, arrivalLocation, departureTime, arrivalTime } = req.body;

			const newRoute = routeRepository.create({
				departureLocation,
				arrivalLocation,
				departureTime: new Date(departureTime),
				arrivalTime: new Date(arrivalTime),
			});

			const errors = await validate(newRoute);

			if (errors.length > 0) {
				res.status(400).json({ errors });
				return;
			}

			const savedRoute = await routeRepository.save(newRoute);

			res.status(201).json(savedRoute);
		} catch (error) {
			console.error('Error creating route:', error);
			res.status(500).send('Internal Server Error');
		}
	}

	async showAll(req: Request, res: Response) {
		try {
			const repository = getRepository(Route);
			const buses = await repository.find();
			res.json(buses);
		} catch (error) {
			console.error('Error retrieving buses:', error);
			res.status(500).send('Internal Server Error');
		}
	}

	async showById(req: Request, res: Response) {
		const id = req.params.id;
		try {
			const repository = getRepository(Route);

			const findOneOptions: FindOneOptions<Route> = {
				where: { id: new ObjectId(id) }, 
			};

			const data = await repository.findOne({ _id: new ObjectId(id) } as FindOneOptions<Route>);

			if (!data) {
				return res.status(404).json({ message: 'Route(Way) not found' });
			}
			res.json(data);
		} catch (error) {
			console.error('Error retrieving Way by ID:', error);
			res.status(500).send('Internal Server Error');
		}
	}

	async update(req: Request, res: Response) {
		
	}

	async delete(req: Request, res: Response) {
		
	}
}

export default new WayController();
