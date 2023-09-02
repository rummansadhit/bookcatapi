import express from 'express';
import * as bookController from '../controllers/bookController';

const bookRoutes = express.Router();

bookRoutes.post('/create-book', bookController.createBook);
bookRoutes.get('/', bookController.getAllBooks);
bookRoutes.get('/:id', bookController.getBookById);
bookRoutes.patch('/:id', bookController.updateBook);
bookRoutes.delete('/:id', bookController.deleteBook);

export default bookRoutes;