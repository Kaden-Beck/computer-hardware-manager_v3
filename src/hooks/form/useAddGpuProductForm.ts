import { useForm } from '@tanstack/react-form';
import {
  gpuProductSchema,
  type GpuFormValues,
} from '@/lib/validators/product/gpu';
import type z from 'zod';

export function useAddGpuForm({
  onSubmit,
}: {
  onSubmit: (values: GpuFormValues) => Promise<void>;
}) {
  return useForm({
    defaultValues: {
      name: '',
      sku: '',
      description: '',
      color: '',
      msrp: 0,
      price: null,
      quantity: 0,
      manufacturerId: '',
      chipset: '',
      vramGB: 0,
      vramType: '',
      tdp: 0,
      coreCount: null,
      baseClockMHz: null,
      boostClockMHz: null,
      lengthMM: null,
      powerConnectors: '',
    } as z.infer<typeof gpuProductSchema>,
    validators: { onChange: gpuProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });
}

export type { GpuFormValues };
