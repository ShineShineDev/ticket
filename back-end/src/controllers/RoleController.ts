import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Role } from '../models/Role';

class RoleController {


	async showAll(req: Request, res: Response) {
		try {
			const roleRepository = getRepository(Role);
			const roles = await roleRepository.find();
			res.json(roles);
		} catch (error) {
			console.error('Error retrieving roles:', error);
			res.status(500).send('Internal Server Error');
		}
	}

	async create(req: Request, res: Response) {
		try {
			const roleRepository = getRepository(Role);
			const newRole = roleRepository.create(req.body);
			const result = await roleRepository.save(newRole);
			res.status(201).json(result);
		} catch (error) {
			console.error('Error creating role:', error);
			res.status(500).send('Internal Server Error');
		}
	}	

	async getByID(req: Request, res: Response) {
		try {
			const roleRepository = getRepository(Role);
		
		} catch (error) {
			console.error('Error retrieving role by ID:', error);
			res.status(500).send('Internal Server Error');
		}
	}

	async update(req: Request, res: Response) {
		try {
			
		} catch (error) {
			console.error('Error updating role:', error);
			res.status(500).send('Internal Server Error');
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const roleRepository = getRepository(Role);
		} catch (error) {
			console.error('Error deleting role:', error);
			res.status(500).send('Internal Server Error');
		}
	}
}

export default new RoleController();
