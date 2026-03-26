import { z } from 'zod';

export const productBaseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  sku: z.string().min(1, 'SKU is required'),
  description: z.string().min(1, 'Description is required'),
  color: z.string(),
  msrp: z
    .number()
    .min(0, 'MSRP must be a positive number')
    .multipleOf(0.01, 'Max 2 decimal places'),
  price: z.number().nullable(),
  quantity: z.number().int().min(0, 'Quantity must be 0 or more'),
  manufacturerId: z.string().min(1, 'Manufacturer is required'),
});

export type ProductBaseFormValues = z.infer<typeof productBaseSchema>;
