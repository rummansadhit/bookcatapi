import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET:string = process.env.JWT_SECRET || 'secret';
const prisma = new PrismaClient();

export function generateToken(user: any): string {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: '365d'
  });
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyCredentials(email: string, password: string): Promise<any> {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) return false;

  if(await bcrypt.compare(password, user.password)) {
    return user;
  }
}

export const createUser = async (userData: any) => {
  return await prisma.user.create({ data: userData });
};
