import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/auth/signup', userController.signUp);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingleUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser); 

export default router;