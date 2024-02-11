import { Request, Response } from 'express';
import { getRepository, FindOneOptions, getMongoRepository } from 'typeorm';
import { Passenger } from '../models/Passenger';
import { validate } from 'class-validator';
import { ObjectId } from 'mongodb';

class PassengerController {

	async create(req: Request, res: Response) {
		try {
			const passengerRepository = getRepository(Passenger);
			const { name, phone, email } = req.body;

			const newPassenger = passengerRepository.create({ name, phone, email });

			const errors = await validate(newPassenger);
			if (errors.length > 0) {
				res.status(400).json({ errors });
				return;
			}
			const savedPassenger = await passengerRepository.save(newPassenger);
			res.status(201).json(savedPassenger);
		} catch (error) {
			console.error('Error creating passenger:', error);
			res.status(500).send('Internal Server Error');
		}
	}

	async showAll(req: Request, res: Response) {
		try {
			const passengerRepository = getRepository(Passenger);
			const passengers = await passengerRepository.find();
			res.json(passengers);
		} catch (error) {
			console.error('Error retrieving passengers:', error);
			res.status(500).send('Internal Server Error');
		}
	}

	async showById(req: Request, res: Response) {
		const id = req.params.id;
		console.log(id);
		try {
			if (!ObjectId.isValid(id)) {
				return res.status(400).json({ message: 'Invalid ObjectId' });
			}
			const passengerRepository = getRepository(Passenger);
			const data = await passengerRepository.findOne({ _id: new ObjectId(id) } as FindOneOptions<Passenger>);
			if (!data) {
				return res.status(200).json({ message: 'Passenger not found' });
			}
			res.json(data);
		} catch (error) {
			console.error('Error retrieving Passenger by ID:', error);
			res.status(500).send('Internal Server Error');
		}
	}

	async update(req: Request, res: Response) {

	}

	async delete(req: Request, res: Response) {
	}
}

export default new PassengerController();
