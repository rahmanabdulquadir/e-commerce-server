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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
//create new order
const createOrder = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.create(product);
    return result;
});
const createOrderToUpdate = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = orderData;
    // Find the product by ID
    const product = yield product_model_1.Product.findById(productId);
    // Check if the product exists
    if (!product) {
        throw new Error("Product not found");
    }
    // Check if there is enough quantity in stock
    if (product.inventory.quantity < quantity) {
        throw new Error("Insufficient quantity available in inventory");
    }
    // Create the new order
    const order = new order_model_1.Order(orderData);
    yield order.save();
    // Update the product inventory
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    yield product.save();
    return order;
});
//get all the orders and email based orders
const getOrders = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (email) {
        query = { email: email };
    }
    const result = yield order_model_1.Order.find(query);
    return result;
});
exports.OrderServices = {
    createOrder,
    createOrderToUpdate,
    getOrders,
};
