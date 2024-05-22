import { z } from "zod";


const VariantValidationSchema = z.object({
  type: z.string().nonempty("Variant type is required"),
  value: z.string().nonempty("Variant value is required"),
});


const InventoryValidationSchema = z.object({
  quantity: z.number().min(0, "Quantity must be a non-negative number").nonnegative("Quantity is required"),
  inStock: z.boolean(),
});

export const ProductValidationSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().nonempty("Product description is required"),
  price: z.number().nonnegative("Price must be a non-negative number"),
  category: z.string().nonempty("Category is required"),
  tags: z.array(z.string().nonempty("Tag cannot be empty")).nonempty("Tags are required"),
  variants: z.array(VariantValidationSchema).nonempty("Variants are required"),
  inventory: InventoryValidationSchema,
});

export default ProductValidationSchema