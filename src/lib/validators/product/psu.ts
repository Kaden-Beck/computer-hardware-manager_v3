import { z } from 'zod';
import { productBaseSchema } from './base';

export const psuProductSchema = productBaseSchema.extend({
  wattage: z.number().min(1, 'Wattage is required'),
  efficiencyRating: z.string().min(1, 'Efficiency rating is required'),
  modular: z.enum(['Full', 'Semi', 'Non-Modular']),
  formFactor: z.string().min(1, 'Form factor is required'),
});

export type PsuFormValues = z.infer<typeof psuProductSchema>;
