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

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductFromDB,
}