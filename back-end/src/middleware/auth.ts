import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).send({
    message: 'Access denied'
  });

  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || '');
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).send({ message: 'Invalid token' });
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePasswords = async (
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};
