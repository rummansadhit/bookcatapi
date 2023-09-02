import express from 'express';
import * as bookController from '../controllers/bookController';

const router = express.Router();

router.post('/create-book', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.patch('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;