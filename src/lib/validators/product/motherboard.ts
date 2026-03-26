import { z } from 'zod';
import { productBaseSchema } from './base';

export const motherboardProductSchema = productBaseSchema.extend({
  socketType: z.string().min(1, 'Socket type is required'),
  chipset: z.string().min(1, 'Chipset is required'),
  formFactor: z.string().min(1, 'Form factor is required'),
  memoryType: z.string().min(1, 'Memory type is required'),
  memorySlots: z.number().min(1, 'Memory slots is required'),
  maxMemoryGB: z.number().min(1, 'Max memory is required'),
  m2Slots: z.number().nullable(),
  sataSlots: z.number().nullable(),
  pciSlots: z.number().nullable(),
});

export type MotherboardFormValues = z.infer<typeof motherboardProductSchema>;
