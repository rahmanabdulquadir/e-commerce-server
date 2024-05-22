import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import OrderValidationSchema from "./order.validation";
import { TOrder } from "./order.interface";
import { Product } from "../product/product.model";
import { Order } from "./order.model";
import { ZodError } from "zod";


const createOrder = async (req: Request, res: Response) => {
  try {
   
    // zod validation
    const orderDate = req.body
    const zodValidatedOrder = OrderValidationSchema.parse(orderDate)
    const result = await OrderServices.createOrder(zodValidatedOrder);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.issues[0].message || "Something went wrong",
      error: error,
    });
  }
};

const createOrderController = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    // console.log(orderData)

    // Create order
    const result = await OrderServices.createOrderToUpdate(orderData);
    console.log(result)

    // Send success response
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "Product not found") {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    } else if (error.message === "Insufficient quantity available in inventory") {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    } else if (error.issues) {
      // Zod validation error
      return res.status(400).json({
        success: false,
        message: error.issues[0].message || "Validation error",
        error: error,
      });
    } else {
      // General error
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  }
};




// get order based controller 
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;
    const orders = await OrderServices.getOrders(email);

    if (email) {
      res.json({
        success: true,
        message: `Orders fetched successfully for user email '${email}'!`,
        data: orders,
      });
    } else {
      res.json({
        success: true,
        message: "Orders fetched successfully!",
        data: orders,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};



export const OrderControllers = {
  createOrderController,
  createOrder,
  getAllOrders,
};
