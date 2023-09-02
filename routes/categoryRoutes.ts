import express from 'express';
import * as categoryController from '../controllers/categoryController';
import { verifyToken } from '../middlewares/verifytokenMiddlewares';
import { adminMiddleware } from '../middlewares/adminMiddlewares';
const categoryRoutes = express.Router();

categoryRoutes.post('/create-category', verifyToken, adminMiddleware,categoryController.createCategory);
categoryRoutes.get('/', categoryController.getAllCategories);
categoryRoutes.get('/:id', categoryController.getSingleCategory);
categoryRoutes.patch('/:id',verifyToken, adminMiddleware, categoryController.updateCategory);
categoryRoutes.delete('/:id', verifyToken, adminMiddleware,categoryController.deleteCategory);

export default categoryRoutes;
