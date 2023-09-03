import { Request, Response } from "express";
import * as orderService from "../services/orderService";
import jwt from "jsonwebtoken";

export const createOrderForCustomer = async (req: Request, res: Response) => {
    const userId = req.params.id|| '';
    console.log(userId);
    const orderData = {

        ...req.body,
        userId
    }
  const order = await orderService.createOrder(orderData);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Order created successfully",
    data: order,
  });
};

export const getAllOrdersForAdmin = async (req: Request, res: Response) => {
  const orders = await orderService.getAllOrders();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Orders retrieved successfully",
    data: orders,
  });
};

export const getOrdersForSpecificCustomer = async (req: Request, res: Response) => {

    const userId = req.params.id|| '';

  const orders = await orderService.getOrdersByUserId(userId);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Orders retrieved successfully",
    data: orders,
  });
};


export const handleOrders = (req: Request, res: Response) => {
    const role = req.params.role;

    if (role === 'admin') {
        return getAllOrdersForAdmin(req, res);
    }

    if (role === 'customer') {
        return getOrdersForSpecificCustomer(req, res);
    }

    // Handle other cases if necessary
};


export const getOrderById = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { role, id } = req.params;

    const order = await orderService.getOrderFromDatabase(orderId);  // You will have to implement the database logic.

    if (role === 'customer' && order.userId !== id) {
        return res.status(403).json({ message: 'This order does not belong to you.' });
    }

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Order fetched successfully',
        data: order
    });
};