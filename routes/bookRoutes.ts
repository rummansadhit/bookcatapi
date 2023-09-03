import express from 'express';
import * as bookController from '../controllers/bookController';
import { verifyToken } from '../middlewares/verifytokenMiddlewares';
import { adminMiddleware } from '../middlewares/adminMiddlewares';

const bookRoutes = express.Router();

bookRoutes.post('/create-book',verifyToken,adminMiddleware,  bookController.createBook);
bookRoutes.get('/', bookController.getAllBooks);
bookRoutes.get('/:id', bookController.getBookById);
bookRoutes.patch('/:id',verifyToken, adminMiddleware,bookController.updateBook);
bookRoutes.delete('/:id',verifyToken, adminMiddleware, bookController.deleteBook);

export default bookRoutes;