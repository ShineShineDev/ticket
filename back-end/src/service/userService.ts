import { getRepository } from 'typeorm';
import { User } from '../models/User';
import { validate } from 'class-validator';
import { hashPassword, comparePasswords } from '../middleware/auth'

export async function registerUser(username: string, email: string, password: string, role: string) {
    const userRepository = getRepository(User);

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
        return { error: 'Email is already registered' };
    }

    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    user.role = role;

    const validationErrors = await validate(user);
    if (validationErrors.length > 0) {
        return { errors: validationErrors };
    }

    const hashedPassword = await hashPassword(password);
    const newUser = userRepository.create({ username, password: hashedPassword, email, role });

    await userRepository.save(newUser);

    return { user: newUser };
}
