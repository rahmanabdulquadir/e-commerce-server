import { Schema, model, } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    required: true
  }
})


// main schema

const productSchema = new Schema<TProduct>({
 // Product Schema

  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema],},
  inventory: { type: inventorySchema,}
})

export const product = model<TProduct>("product", productSchema)
