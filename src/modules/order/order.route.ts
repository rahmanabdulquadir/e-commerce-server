import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post("/", OrderControllers.createOrder);
router.post("/", OrderControllers.createOrderController);
router.get("/", OrderControllers.getAllOrders);

export const OrderRoutes = router;
