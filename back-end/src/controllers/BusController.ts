import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getRepository, FindOneOptions } from 'typeorm';
import { Bus } from '../models/Bus';

class BusController {


	async showAll(req: Request, res: Response) {
		try {
			const busRepository = getRepository(Bus);
			const buses = await busRepository.find();
			res.json(buses);
		} catch (error) {
			console.error('Error retrieving buses:', error);
			res.status(500).send('Internal Server Error');
		}
	}

	async showById(req: Request, res: Response) {
		const busId = req.params.id; 

		try {
			const busRepository = getRepository(Bus);

			const findOneOptions: FindOneOptions<Bus> = {
				where: { id: new ObjectId(busId) }, 
			};

			const bus = await busRepository.findOne({ _id: new ObjectId(busId) } as FindOneOptions<Bus>);

			if (!bus) {
				return res.status(404).json({ message: 'Bus not found' });
			}

			res.json(bus);
		} catch (error) {
			console.error('Error retrieving bus by ID:', error);
			res.status(500).send('Internal Server Error');
		}
	}

	async create(req: Request, res: Response) {
		try {
			const busRepository = getRepository(Bus);
			const { busNumber, capacity, details } = req.body;

			const newBus = busRepository.create({
				busNumber,
				capacity,
				details,
			});

			const savedBus = await busRepository.save(newBus);

			res.status(201).json(savedBus);
		} catch (error) {
			console.error('Error creating bus:', error);
			res.status(500).send('Internal Server Error');
		}
	}

	async update(req: Request, res: Response) {
		
	}

	async delete(req: Request, res: Response) {
		
	}
}

export default new BusController();
