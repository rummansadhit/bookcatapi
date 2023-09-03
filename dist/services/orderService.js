"use strict";
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
exports.getOrderFromDatabase = exports.getOrdersByUserId = exports.getAllOrders = exports.createOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOrder = (orderInput) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, orderedBooks } = orderInput;
    return prisma.order.create({
        data: {
            userId,
            orderedBooks,
            status: "pending",
            createdAt: new Date().toISOString(),
        }
    });
});
exports.createOrder = createOrder;
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.order.findMany();
});
exports.getAllOrders = getAllOrders;
const getOrdersByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.order.findMany({
        where: {
            userId: userId
        }
    });
});
exports.getOrdersByUserId = getOrdersByUserId;
function getOrderFromDatabase(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield prisma.order.findUnique({
                where: {
                    id: orderId
                }
            });
            if (!order) {
                throw new Error('Order not found');
            }
            return order;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.getOrderFromDatabase = getOrderFromDatabase;
