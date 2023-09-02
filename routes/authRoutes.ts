import express from 'express';
import * as authController from '../controllers/authController';

const authRoutes = express.Router();

authRoutes.post('/signup', authController.signUp);
authRoutes.post('/signin', authController.signIn);

export default authRoutes;