import express from "express";
import * as orderController from "../controllers/orderController";
import { verifyToken } from '../middlewares/verifytokenMiddlewares';
import { adminMiddleware } from '../middlewares/adminMiddlewares';
import { customerMiddleware } from '../middlewares/customerMiddlewares';
import { roleBasedMiddleware } from "../middlewares/rolebasedMiddlewares";

const router = express.Router();

router.post("/create-order",verifyToken,customerMiddleware, orderController.createOrderForCustomer);
router.get("/",verifyToken, roleBasedMiddleware, orderController.handleOrders);
//router.get("/", verifyToken,roleBasedMiddleware, orderController.getOrdersForSpecificCustomer); // This will conflict with the above route. Consider adding a user ID parameter or query for differentiation.
router.get("/:orderId", verifyToken,roleBasedMiddleware, orderController.getOrderById);
export default router;