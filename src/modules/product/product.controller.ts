import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const result = await ProductServices.createProduct(productData);

  res.json({
    success: true,
    message: "Product created successfully!",
    data: result,
  });
};

// get all the products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProducts();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch products",
      error: err,
    });
  }
};

const getASingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const result = await ProductServices.getProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getASingleProduct,
};
