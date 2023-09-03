import { Request, Response } from 'express';
import * as bookService from '../services/bookService';

export const createBook = async (req: Request, res: Response) => {
  // TODO: Check if the user is an admin
  const book = await bookService.createBook(req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Book created successfully",
    data: book,
  });
};

export async function getAllBooks(req: Request, res: Response): Promise<void> {
  try {
      const {
          page,
          size,
          sortBy,
          sortOrder,
          minPrice,
          maxPrice,
          category,
          search
      } = req.query;

      console.log(req.query);
      let bookOrder: bookService.SortOrder;
      if(sortOrder === 'asc') {
        bookOrder = bookService.SortOrder.ASC;

      }
      else if(sortOrder === 'desc') {
        bookOrder = bookService.SortOrder.DESC;
      }
      else {
        bookOrder = bookService.SortOrder.ASC;
      }

      const booksData = await bookService.fetchBooks({
          page: page===undefined ? undefined : Number(page),
          size: size===undefined ? undefined : Number(size),
          sortBy: sortBy===undefined ? undefined : String(sortBy),
          sortOrder: bookOrder,
          minPrice: maxPrice===undefined ? undefined : Number(minPrice),
          maxPrice: maxPrice===undefined ? undefined : Number(maxPrice),
          category: category===undefined ? undefined : String(category),
          search: search===undefined ? undefined : String(search)
      });

      res.json(booksData);

  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Internal Error"
      });
  }
}

export const getBookById = async (req: Request, res: Response) => {
    try {
      const book = await bookService.getBookById(req.params.id);
  
      if (!book) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: 'Book not found',
        });
      }
  
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Book fetched successfully',
        data: book
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Server error',
      });
    }
  };
  
  export const updateBook = async (req: Request, res: Response) => {
    try {
      const updatedBook = await bookService.updateBook(req.params.id, req.body);
  
      if (!updatedBook) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: 'Book not found or update failed',
        });
      }
  
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Book updated successfully',
        data: updatedBook,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Server error',
      });
    }
  };
  
  export const deleteBook = async (req: Request, res: Response) => {
    try {
      const result = await bookService.deleteBook(req.params.id);
  
      if (!result) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: 'Book not found or deletion failed',
        });
      }
  
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Book deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Server error',
      });
    }
  };