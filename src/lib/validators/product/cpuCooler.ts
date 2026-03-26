import { z } from 'zod';
import { productBaseSchema } from './base';

export const cpuCoolerProductSchema = productBaseSchema.extend({
  coolerType: z.enum(['Air', 'AIO', 'Custom Loop']),
  fanSizeMM: z.number().min(1, 'Fan size is required'),
  maxTDP: z.number().min(1, 'Max TDP is required'),
  socketCompatibility: z.string().min(1, 'Socket compatibility is required'),
  heightMM: z.number().min(1, 'Height is required'),
  radiatorSizeMM: z.number().nullable(),
});

export type CpuCoolerFormValues = z.infer<typeof cpuCoolerProductSchema>;
