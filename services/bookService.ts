import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createBook = async (bookData) => {
  return await prisma.book.create({
    data: bookData,
    include: {
      category: true,
    },
  });
};

export const getAllBooks = async () => {
  return await prisma.book.findMany({
    include: {
      category: true,
    },
  });
};

export const getBookById = async (id: string) => {
  return await prisma.book.findUnique({
    where: { id: id },
    include: {
      category: true,
    },
  });
};

export const updateBook = async (id: string, bookData) => {
  return await prisma.book.update({
    where: { id: id },
    data: bookData,
    include: {
      category: true,
    },
  });
};

export const deleteBook = async (id: string) => {
  return await prisma.book.delete({
    where: { id: id },
  });
};
