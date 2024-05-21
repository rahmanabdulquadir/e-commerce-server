import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";


const variantSchema: Schema<TVariant> = new Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
});



const inventorySchema: Schema<TInventory> = new Schema({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// main schema

//  // Product Schema

const productSchema: Schema<TProduct> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

export const Product = model<TProduct>("product", productSchema);
