import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post("/", ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getASingleProduct);
router.put("/:productId", ProductControllers.updateProduct);
router.delete('/:productId', ProductControllers.deleteProduct);
// router.get("/", ProductControllers.searchProducts);

export const ProductRoutes = router;
