"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // zod validation
        const orderDate = req.body;
        const zodValidatedOrder = order_validation_1.default.parse(orderDate);
        const result = yield order_service_1.OrderServices.createOrder(zodValidatedOrder);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.issues[0].message || "Something went wrong",
            error: error,
        });
    }
});
const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        // Create order
        const result = yield order_service_1.OrderServices.createOrderToUpdate(orderData);
        // Send success response
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        if (error.message === "Product not found") {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        else if (error.message === "Insufficient quantity available in inventory") {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        else if (error.issues) {
            // Zod validation error
            return res.status(400).json({
                success: false,
                message: error.issues[0].message || "Validation error",
                error: error,
            });
        }
        else {
            // General error
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error,
            });
        }
    }
});
// get order based controller
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const orders = yield order_service_1.OrderServices.getOrders(email);
        if (email) {
            res.json({
                success: true,
                message: `Orders fetched successfully for user email '${email}'!`,
                data: orders,
            });
        }
        else {
            res.json({
                success: true,
                message: "Orders fetched successfully!",
                data: orders,
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
});
exports.OrderControllers = {
    createOrderController,
    createOrder,
    getAllOrders,
};
