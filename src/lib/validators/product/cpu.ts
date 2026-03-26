import { z } from 'zod';
import { productBaseSchema } from './base';

export const cpuProductSchema = productBaseSchema.extend({
  cores: z.number().min(1, 'Core count is required'),
  threads: z.number().min(1, 'Thread count is required'),
  baseClockGHz: z.number().min(0.1, 'Base clock is required'),
  tdp: z.number().min(1, 'TDP is required'),
  socketType: z.string().min(1, 'Socket type is required'),
  integratedGraphics: z.boolean(),
  boostClockGHz: z.number().nullable(),
  cacheMB: z.number().nullable(),
});

export type CpuFormValues = z.infer<typeof cpuProductSchema>;
