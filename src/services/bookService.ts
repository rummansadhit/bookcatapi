import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export enum SortOrder {
  ASC = "asc",
  DESC = "desc"
}
interface BookFilters {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  search?: string;
}
export const createBook = async (bookData: any) => {
  const { publicationDate } = bookData;
  const publicationDateObj = new Date(publicationDate);
  
  // Use spread operator to copy all properties, then override the publicationDate
  const bookObj = {
    ...bookData,
    publicationDate: publicationDateObj
  };

  return await prisma.book.create({
    data: bookObj,
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


export const fetchBooks = async (filters: BookFilters) => {
  const page = filters.page || 1;
  const size = filters.size || 10;

  const searchFilters: any = {};

  if (filters.minPrice || filters.maxPrice) {
    searchFilters.price = {
      ...(filters.minPrice ? { gte: filters.minPrice } : {}),
      ...(filters.maxPrice ? { lte: filters.maxPrice } : {})
    };
  }

  if (filters.category) {
    searchFilters.categoryId = filters.category;
  }

  if (filters.search) {
    searchFilters.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { author: { contains: filters.search, mode: 'insensitive' } },
      { genre: { contains: filters.search, mode: 'insensitive' } }
    ];
  }

  let orderBy: any = {};
  if (filters.sortBy) {
    orderBy[filters.sortBy] = filters.sortOrder || SortOrder.ASC;
  } else {
    orderBy = { title: SortOrder.ASC };  // Default sorting
  }

  try {
    const findManyArgs: any = {
      where: (Object.keys(searchFilters).length > 0) ? searchFilters : undefined,
      skip: (page - 1) * size,
      take: size
    };

    if (Object.keys(orderBy).length > 0) {
      findManyArgs.orderBy = orderBy;
    }

    const books = await prisma.book.findMany(findManyArgs);

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
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}


// services/bookService.ts

export const fetchBooksByCategory = async (categoryId: string, page: number = 1, size: number = 10) => {
  try {
      const searchFilters = { categoryId };

      const books = await prisma.book.findMany({
          where: searchFilters,
          skip: (page - 1) * size,
          take: size
      });

      const totalBooks = await prisma.book.count({ where: searchFilters });
      const totalPages = Math.ceil(totalBooks / size);

      return {
          success: true,
          statusCode: 200,
          message: "Books with associated category data fetched successfully",
          meta: {
              page,
              size,
              total: totalBooks,
              totalPage: totalPages
          },
          data: books
      };
  } catch (error) {
      console.error("Error fetching books by category:", error);
      throw error;
  }
}



