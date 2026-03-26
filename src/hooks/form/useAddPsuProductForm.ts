import { useForm } from '@tanstack/react-form';
import {
  psuProductSchema,
  type PsuFormValues,
} from '@/lib/validators/product/psu';
import type z from 'zod';

export function useAddPsuForm({
  onSubmit,
}: {
  onSubmit: (values: PsuFormValues) => Promise<void>;
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
      wattage: 0,
      efficiencyRating: '',
      modular: 'Non-Modular' as const,
      formFactor: '',
    } as z.infer<typeof psuProductSchema>,
    validators: { onChange: psuProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });
}

export type { PsuFormValues };
