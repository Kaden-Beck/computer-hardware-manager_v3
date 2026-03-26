import { useForm } from '@tanstack/react-form';
import {
  storageProductSchema,
  type StorageFormValues,
} from '@/lib/validators/product/storage';
import type z from 'zod';

export function useAddStorageForm({
  onSubmit,
}: {
  onSubmit: (values: StorageFormValues) => Promise<void>;
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
      storageType: 'SSD' as const,
      capacityGB: 0,
      interface: '',
      formFactor: '',
      readSpeedMBps: null,
      writeSpeedMBps: null,
    } as z.infer<typeof storageProductSchema>,
    validators: { onChange: storageProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });
}

export type { StorageFormValues };
