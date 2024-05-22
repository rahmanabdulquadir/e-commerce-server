import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async(product: TOrder) => {
  const result = await Order.create(product);
  return result
}

const getAllOrders = async () => {
  const result = await Order.find()
  return result;
}

const getOrdersByEmailFromDB = async (email: string) => {
  try {
    const orders = await Order.find({ email });
    return orders;
  } catch (error) {
    console.error('Error fetching orders by email:', error);
    throw error;
  }
};


export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrdersByEmailFromDB,
}
