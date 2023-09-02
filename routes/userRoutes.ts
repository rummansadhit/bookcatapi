import express from 'express';
import * as userController from '../controllers/userController';
import { verifyToken } from '../middlewares/verifytokenMiddlewares';
import { adminMiddleware } from '../middlewares/adminMiddlewares';

const userRoutes = express.Router();


userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/:id', verifyToken, adminMiddleware,userController.getSingleUser);
userRoutes.patch('/:id', verifyToken, adminMiddleware,userController.updateUser);
userRoutes.delete('/:id',verifyToken, adminMiddleware, userController.deleteUser); 

export default userRoutes;