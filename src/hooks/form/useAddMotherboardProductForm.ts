import { useForm } from '@tanstack/react-form';
import {
  motherboardProductSchema,
  type MotherboardFormValues,
} from '@/lib/validators/product/motherboard';
import type z from 'zod';

export function useAddMotherboardForm({
  onSubmit,
}: {
  onSubmit: (values: MotherboardFormValues) => Promise<void>;
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
      socketType: '',
      chipset: '',
      formFactor: '',
      memoryType: '',
      memorySlots: 0,
      maxMemoryGB: 0,
      m2Slots: null,
      sataSlots: null,
      pciSlots: null,
    } as z.infer<typeof motherboardProductSchema>,
    validators: { onChange: motherboardProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });
}

export type { MotherboardFormValues };
