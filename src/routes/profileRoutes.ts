import express from "express";
import * as orderController from "../controllers/orderController";
import { verifyToken } from '../middlewares/verifytokenMiddlewares';
import { adminMiddleware } from '../middlewares/adminMiddlewares';
import { customerMiddleware } from '../middlewares/customerMiddlewares';
import { roleBasedMiddleware } from "../middlewares/rolebasedMiddlewares";
import * as profileControllers from "../controllers/profileController";
const router = express.Router();

router.get("/",verifyToken ,profileControllers.getUserProfile);
export default router;