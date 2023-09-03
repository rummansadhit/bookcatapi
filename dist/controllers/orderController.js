"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.handleOrders = exports.getOrdersForSpecificCustomer = exports.getAllOrdersForAdmin = exports.createOrderForCustomer = void 0;
const orderService = __importStar(require("../services/orderService"));
const createOrderForCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id || '';
    console.log(userId);
    const orderData = Object.assign(Object.assign({}, req.body), { userId });
    const order = yield orderService.createOrder(orderData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Order created successfully",
        data: order,
    });
});
exports.createOrderForCustomer = createOrderForCustomer;
const getAllOrdersForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderService.getAllOrders();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Orders retrieved successfully",
        data: orders,
    });
});
exports.getAllOrdersForAdmin = getAllOrdersForAdmin;
const getOrdersForSpecificCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id || '';
    const orders = yield orderService.getOrdersByUserId(userId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Orders retrieved successfully",
        data: orders,
    });
});
exports.getOrdersForSpecificCustomer = getOrdersForSpecificCustomer;
const handleOrders = (req, res) => {
    const role = req.params.role;
    if (role === 'admin') {
        return (0, exports.getAllOrdersForAdmin)(req, res);
    }
    if (role === 'customer') {
        return (0, exports.getOrdersForSpecificCustomer)(req, res);
    }
    // Handle other cases if necessary
};
exports.handleOrders = handleOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { role, id } = req.params;
    const order = yield orderService.getOrderFromDatabase(orderId); // You will have to implement the database logic.
    if (role === 'customer' && order.userId !== id) {
        return res.status(403).json({ message: 'This order does not belong to you.' });
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Order fetched successfully',
        data: order
    });
});
exports.getOrderById = getOrderById;
