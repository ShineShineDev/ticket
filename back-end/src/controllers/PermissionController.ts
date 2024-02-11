import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Permissions } from '../models/Permissions';

class PermissionController {
	async create(req: Request, res: Response) {
		res.json("create");
	}
	async showAll(req: Request, res: Response) {
		try {
			const repository = getRepository(Permissions);
			const data = await repository.find();
			res.json(data);
		} catch (error) {
			console.error('Error retrieving permissions:', error);
			res.status(500).send('Internal Server Error');
		}
	}
	async getByID(req: Request, res: Response) {
		const id = req.params.id;
		res.json("get by id" + id);
	}
	async update(req: Request, res: Response) {
		const id = req.params.id;
		res.json("update by id" + id);
	}
	async delete(req: Request, res: Response) {
		const id = req.params.id;
		res.json("delet by id" + id);
	}
}

export default new PermissionController();
