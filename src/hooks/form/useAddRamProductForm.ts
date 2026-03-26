import { useForm } from '@tanstack/react-form';
import {
  ramProductSchema,
  type RamFormValues,
} from '@/lib/validators/product/ram';
import type z from 'zod';

export function useAddRamForm({
  onSubmit,
}: {
  onSubmit: (values: RamFormValues) => Promise<void>;
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
      memoryType: '',
      speedMHz: 0,
      capacityGB: 0,
      modules: 0,
      casLatency: null,
      voltage: null,
    } as z.infer<typeof ramProductSchema>,
    validators: { onChange: ramProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });
}

export type { RamFormValues };
