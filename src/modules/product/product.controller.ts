import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const result = await ProductServices.createProduct(productData)

  res.json({
    "success": true,
    "message": "Products fetched successfully!",
    "data": result
  })
  // res.send("Hi from posting method");
}

export const ProductControllers = {
  createProduct,
}