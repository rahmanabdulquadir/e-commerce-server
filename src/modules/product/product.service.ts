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
    const objectId = new mongoose.Types.ObjectId(id);

    const result = await Product.findByIdAndDelete(objectId);

    return result;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};


const searchProducts = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i');  // 'i' makes the search case-insensitive
  const result = await Product.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
      { tags: { $in: [regex] } },
    ],
  });
  return result;
};


const updateProductInDB = async (id: string, productData: any) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);

    const updatedProduct = await Product.findByIdAndUpdate(
      objectId,
      { $set: productData },
      { new: true, runValidators: true }
    );

    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductFromDB,
  deleteProductFromDB,
  searchProducts,
  updateProductInDB,
}