import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


interface BookFilters {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  search?: string;
}

export const createBook = async (bookData: any) => {
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

export const updateBook = async (id: string, bookData: any) => {
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


export  const fetchBooks = async (filters: BookFilters) => {
  // Default values
  const page = filters.page || 1;
  const size = filters.size || 10;

  // Create search filters
  const searchFilters: any = {};

  if (filters.minPrice) searchFilters.price = { gte: filters.minPrice };
  if (filters.maxPrice) searchFilters.price = { ...searchFilters.price, lte: filters.maxPrice };
  if (filters.category) searchFilters.categoryId = filters.category;

  // Handle search query
  if (filters.search) {
      searchFilters.OR = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { author: { contains: filters.search, mode: 'insensitive' } },
          { genre: { contains: filters.search, mode: 'insensitive' } }
      ];
  }

  // Fetch books
  const books = await prisma.book.findMany({
      where: searchFilters,
      skip: (page - 1) * size,
      take: size,
      orderBy: {
          [filters.sortBy || 'title']: filters.sortOrder || 'asc'
      }
  });

  // Calculate total books and total pages
  const totalBooks = await prisma.book.count({ where: searchFilters });
  const totalPages = Math.ceil(totalBooks / size);

  return {
      success: true,
      statusCode: 200,
      message: "Books fetched successfully",
      meta: {
          page,
          size,
          total: totalBooks,
          totalPage: totalPages
      },
      data: books
  };
}