import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const createUser = async (userData) => {
    return await prisma.user.create({ data: userData });
};



export const getAllUsers = async () => {
    return await prisma.user.findMany();
};

export const getSingleUser = async (id: string) => {
    return await prisma.user.findUnique({ where: { id: id } });
};

export const updateUser = async (id: string, userData) => {
    return await prisma.user.update({ where: { id: id }, data: userData });
};

export const deleteUser = async (id: string) => {
    return await prisma.user.delete({ where: { id: id } });
};

