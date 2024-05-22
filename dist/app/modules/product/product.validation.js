"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidationSchema = void 0;
const zod_1 = require("zod");
const VariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().nonempty("Variant type is required"),
    value: zod_1.z.string().nonempty("Variant value is required"),
});
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, "Quantity must be a non-negative number").nonnegative("Quantity is required"),
    inStock: zod_1.z.boolean(),
});
exports.ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required"),
    description: zod_1.z.string().nonempty("Product description is required"),
    price: zod_1.z.number().nonnegative("Price must be a non-negative number"),
    category: zod_1.z.string().nonempty("Category is required"),
    tags: zod_1.z.array(zod_1.z.string().nonempty("Tag cannot be empty")).nonempty("Tags are required"),
    variants: zod_1.z.array(VariantValidationSchema).nonempty("Variants are required"),
    inventory: InventoryValidationSchema,
});
exports.default = exports.ProductValidationSchema;
