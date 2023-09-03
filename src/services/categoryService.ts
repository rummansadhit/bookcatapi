import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategory = async (categoryData: any) => {
    return await prisma.category.create({ data: categoryData });
};

export const getAllCategories = async () => {
    return await prisma.category.findMany();
};

export const getSingleCategory = async (id: string) => {
    return await prisma.category.findUnique({ where: { id: id }, include: { books: true } });
};

export const updateCategory = async (id: string, categoryData: any) => {
    return await prisma.category.update({ where: { id: id }, data: categoryData });
};

export const deleteCategory = async (id: string) => {
    return await prisma.category.delete({ where: { id: id } });
};
