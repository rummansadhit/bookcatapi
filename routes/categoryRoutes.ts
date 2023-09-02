import express from 'express';
import * as categoryController from '../controllers/categoryController';

const router = express.Router();

router.post('/create-category', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getSingleCategory);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
