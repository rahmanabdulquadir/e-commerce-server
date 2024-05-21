import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async(product: TProduct) => {
  const result = await Product.create(product);
  return result
}

const getAllProducts = async () => {
  const result = await Product.find()
  return result;
}

const getProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  try {
    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid product ID');
    }

    // Convert the string id to an ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Perform the update operation
    const result = await Product.updateOne({ _id: objectId },);

    console.log('Delete result:', result);

    // Return the result of the update operation
    return result;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductFromDB,
  deleteProductFromDB,
}