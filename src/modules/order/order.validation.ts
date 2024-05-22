import { z } from "zod";

const OrderValidationSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  productId: z.string().nonempty("Product ID is required"),
  price: z.number().nonnegative("Price must be a non-negative number"),
  quantity: z.number().int().nonnegative("Quantity must be a non-negative integer").min(1, "Quantity must be at least 1"),
});

export default OrderValidationSchema;
