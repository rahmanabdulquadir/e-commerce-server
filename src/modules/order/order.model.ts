import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema: Schema<TOrder> = new Schema({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true
  }
});

export const Order = model<TOrder>("order", orderSchema);