import { useForm } from '@tanstack/react-form';
import {
  cpuCoolerProductSchema,
  type CpuCoolerFormValues,
} from '@/lib/validators/product/cpuCooler';
import type z from 'zod';

export function useAddCpuCoolerForm({
  onSubmit,
}: {
  onSubmit: (values: CpuCoolerFormValues) => Promise<void>;
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
      coolerType: 'Air' as const,
      fanSizeMM: 0,
      maxTDP: 0,
      socketCompatibility: '',
      heightMM: 0,
      radiatorSizeMM: null,
    } as z.infer<typeof cpuCoolerProductSchema>,
    validators: { onChange: cpuCoolerProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });
}

export type { CpuCoolerFormValues };
