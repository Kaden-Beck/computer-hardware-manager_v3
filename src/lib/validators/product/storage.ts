import { z } from 'zod';
import { productBaseSchema } from './base';

export const storageProductSchema = productBaseSchema.extend({
  storageType: z.enum(['SSD', 'HDD', 'NVMe']),
  capacityGB: z.number().min(1, 'Capacity is required'),
  interface: z.string().min(1, 'Interface is required'),
  formFactor: z.string().min(1, 'Form factor is required'),
  readSpeedMBps: z.number().nullable(),
  writeSpeedMBps: z.number().nullable(),
});

export type StorageFormValues = z.infer<typeof storageProductSchema>;
