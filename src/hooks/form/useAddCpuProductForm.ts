import { useForm } from '@tanstack/react-form';
import {
  cpuProductSchema,
  type CpuFormValues,
} from '@/lib/validators/product/cpu';
import type z from 'zod';

export function useAddCpuForm({
  onSubmit,
}: {
  onSubmit: (values: CpuFormValues) => Promise<void>;
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
      cores: 0,
      threads: 0,
      baseClockGHz: 0,
      tdp: 0,
      socketType: '',
      integratedGraphics: false,
      boostClockGHz: null,
      cacheMB: null,
    } as z.infer<typeof cpuProductSchema>,
    validators: { onChange: cpuProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });
}

export type { CpuFormValues };
