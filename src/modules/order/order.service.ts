import mongoose from "mongoose";
import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

//create new order
const createOrder = async(product: TOrder) => {
  const result = await Order.create(product);
  return result
}


const createOrderToUpdate = async (orderData: TOrder) => {
  const { productId, quantity } = orderData;

  // Find the product by ID
  const product = await Product.findById(productId);
  console.log(product)

  // Check if the product exists
  if (!product) {
    throw new Error("Product not found");
  }

  // Check if there is enough quantity in stock
  if (product.inventory.quantity < quantity) {
    throw new Error("Insufficient quantity available in inventory");
  }

  // Create the new order
  const order = new Order(orderData);
  await order.save();

  // Update the product inventory
  product.inventory.quantity -= quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  return order;
};




//get all the orders and email based orders
const getOrders = async (email?: string) => {
  let query = {}; 
  if (email) {
    query = { email: email };
  }

  const result = await Order.find(query);
  return result;
};



export const OrderServices = {
  createOrder,
  createOrderToUpdate,
  getOrders,
}
