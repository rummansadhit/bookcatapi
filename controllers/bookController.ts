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

export const getAllBooks = async (req: Request, res: Response) => {
  // TODO: Implement pagination and other query parameters logic
  const books = await bookService.getAllBooks();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Books fetched successfully",
    data: books,
  });
};


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