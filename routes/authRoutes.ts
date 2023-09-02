import express from 'express';
import * as userController from '../controllers/userController';

const authRoutes = express.Router();

authRoutes.post('/signup', userController.signUp);


export default authRoutes;