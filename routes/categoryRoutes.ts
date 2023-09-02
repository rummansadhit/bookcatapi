import express from 'express';
import * as categoryController from '../controllers/categoryController';
import { verifyToken } from '../middlewares/verifytokenMiddlewares';
import { adminMiddleware } from '../middlewares/adminMiddlewares';
const router = express.Router();

router.post('/create-category', verifyToken, adminMiddleware,categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getSingleCategory);
router.patch('/:id',verifyToken, adminMiddleware, categoryController.updateCategory);
router.delete('/:id', verifyToken, adminMiddleware,categoryController.deleteCategory);

export default router;
