import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import ProductValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  
  try {
    const productData = req.body;
    // validation using zod
    const zodValidatedData = ProductValidationSchema.parse(productData);
    const result = await ProductServices.createProduct(zodValidatedData);

    res.json({
      success: true,
      message: "Product created successfully!",
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

// get all the products and search product by name
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const products = await ProductServices.getProducts(searchTerm);

    if (searchTerm) {
      res.json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: products,
      });
    } else {
      res.json({
        success: true,
        message: "Products fetched successfully!",
        data: products,
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

// get a single product 
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

//delete product 
const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const result = await ProductServices.deleteProductFromDB(productId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};



const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const productData = req.body;
    //zod validation
    const zodValidatedData = ProductValidationSchema.parse(productData);
    const updatedProduct = await ProductServices.updateProductInDB(
      productId,
      zodValidatedData
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.issues[0].message || "Something went wrong",
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getASingleProduct,
  deleteProduct,
  updateProduct,
};
