import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserFromDatabase(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw error;
    }
}
