import express from 'express';
import * as userController from '../controllers/userController';

const userRoutes = express.Router();


userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/:id', userController.getSingleUser);
userRoutes.patch('/:id', userController.updateUser);
userRoutes.delete('/:id', userController.deleteUser); 

export default userRoutes;