import { z } from 'zod';
import { productBaseSchema } from './base';

export const gpuProductSchema = productBaseSchema.extend({
  chipset: z.string().min(1, 'Chipset is required'),
  vramGB: z.number().min(1, 'VRAM is required'),
  vramType: z.string().min(1, 'VRAM type is required'),
  tdp: z.number().min(1, 'TDP is required'),
  coreCount: z.number().nullable(),
  baseClockMHz: z.number().nullable(),
  boostClockMHz: z.number().nullable(),
  lengthMM: z.number().nullable(),
  powerConnectors: z.string(),
});

export type GpuFormValues = z.infer<typeof gpuProductSchema>;
