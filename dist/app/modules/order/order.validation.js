"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const OrderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address").nonempty("Email is required"),
    productId: zod_1.z.string().nonempty("Product ID is required"),
    price: zod_1.z.number().nonnegative("Price must be a non-negative number"),
    quantity: zod_1.z.number().int().nonnegative("Quantity must be a non-negative integer").min(1, "Quantity must be at least 1"),
});
exports.default = OrderValidationSchema;
