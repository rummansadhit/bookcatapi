import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (orderInput: any) => {
  const { userId, orderedBooks } = orderInput;

  return prisma.order.create({
    data: {
      userId,
      orderedBooks,
      status: "pending",
      createdAt: new Date().toISOString(),

    }
  });
};

export const getAllOrders = async () => {
  return prisma.order.findMany();
};

export const getOrdersByUserId = async (userId: string) => {
  return prisma.order.findMany({
    where: {
      userId: userId
    }
  });
};


export async function getOrderFromDatabase(orderId: string) {
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        });

        if (!order) {
            throw new Error('Order not found');
        }

        return order;
    } catch (error) {
        throw error;
    }
}