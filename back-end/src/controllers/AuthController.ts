import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePasswords } from '../middleware/auth';
import { validate } from 'class-validator'; 

class AuthController {

    async register(req: Request, res: Response) {

        const userRepository = getRepository(User);
        console.log("Register Data...");
        console.log(req.body);
        const { username, email, password, role } = req.body;

        try {

            const existingUser = await userRepository.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email is already registered' });
            }
            const user = new User();
            user.username = username;
            user.password = password;
            user.email = email;
            user.role = role;

            const validationErrors = await validate(user);

            if (validationErrors.length > 0) {
                return res.status(400).json({ errors: validationErrors });
            }

            const hashedPassword = await hashPassword(password);

            const newUser = userRepository.create({ username, password: hashedPassword, email, role });

            await userRepository.save(newUser);

            const token = jwt.sign({ username: newUser.username }, process.env.JWT_SECRET || '', {
                expiresIn: '30d'
            });
            res.status(201).json({ user: { username, email, role }, token, expiresIn: '30d' });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async login(req: Request, res: Response) {
        
        console.log("Login Data...");
        console.log(req.body);

        const { email, password } = req.body;
        const userRepository = getRepository(User);

        try {
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            const user = await userRepository.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const passwordsMatch = await comparePasswords(password, user.password);

            if (!passwordsMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || '', {
                expiresIn: '30d',
            });

            res.json({ user: { "username": user.username, "email": user.email, "role": user.role }, token, expiresIn: '30d' });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).send('Internal Server Error');
        }
    }

}

export default new AuthController();
