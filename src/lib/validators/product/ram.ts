import { z } from 'zod';
import { productBaseSchema } from './base';

export const ramProductSchema = productBaseSchema.extend({
  memoryType: z.string().min(1, 'Memory type is required'),
  speedMHz: z.number().min(1, 'Speed is required'),
  capacityGB: z.number().min(1, 'Capacity is required'),
  modules: z.number().min(1, 'Module count is required'),
  casLatency: z.number().nullable(),
  voltage: z.number().nullable(),
});

export type RamFormValues = z.infer<typeof ramProductSchema>;
