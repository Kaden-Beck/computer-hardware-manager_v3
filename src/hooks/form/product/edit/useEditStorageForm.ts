import { useForm } from '@tanstack/react-form';
import {
  storageProductSchema,
  type StorageFormValues,
} from '@/lib/validators/product/storage';
import type { Product } from '@/schema/Product';

export type { StorageFormValues };

interface UseStorageProductFormOptions {
  categoryId: string;
  product?: Product;
  onSubmit: (values: StorageFormValues, categoryId: string) => Promise<void>;
}

export function useStorageProductForm({
  categoryId,
  product,
  onSubmit,
}: UseStorageProductFormOptions) {
  const specs = product?.specs?.type === 'storage' ? product.specs : undefined;

  return useForm({
    defaultValues: {
      name: product?.name ?? '',
      sku: product?.sku ?? '',
      description: product?.description ?? '',
      color: product?.color ?? '',
      msrp: product?.msrp ?? 0,
      price: product?.price ?? null,
      quantity: product?.quantity ?? 0,
      manufacturerId: product?.manufacturerId ?? '',
      storageType: specs?.storageType ?? 'SSD',
      capacityGB: specs?.capacityGB ?? 0,
      interface: specs?.interface ?? '',
      formFactor: specs?.formFactor ?? '',
      readSpeedMBps: specs?.readSpeedMBps ?? null,
      writeSpeedMBps: specs?.writeSpeedMBps ?? null,
    },
    validators: { onChange: storageProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value, categoryId);
    },
  });
}
