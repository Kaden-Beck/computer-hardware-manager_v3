import { z } from 'zod';
import { productBaseSchema } from './base';

export const caseProductSchema = productBaseSchema.extend({
  formFactor: z.string().min(1, 'Form factor is required'),
  moboSupport: z.string().min(1, 'Motherboard support is required'),
  maxGPULengthMM: z.number().nullable(),
  maxCPUCoolerHeightMM: z.number().nullable(),
  maxPSULengthMM: z.number().nullable(),
  driveSlotsTwoHalf: z.number().nullable(),
  driveSlotsThreeHalf: z.number().nullable(),
  fanSlots: z.number().nullable(),
  radiatorSupport: z.string(),
});

export type CaseFormValues = z.infer<typeof caseProductSchema>;
