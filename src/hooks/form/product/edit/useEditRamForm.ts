import { useForm } from '@tanstack/react-form';
import {
  ramProductSchema,
  type RamFormValues,
} from '@/lib/validators/product/ram';
import type { Product } from '@/schema/Product';

export type { RamFormValues };

interface UseRamProductFormOptions {
  categoryId: string;
  product?: Product;
  onSubmit: (values: RamFormValues, categoryId: string) => Promise<void>;
}

export function useRamProductForm({
  categoryId,
  product,
  onSubmit,
}: UseRamProductFormOptions) {
  const specs = product?.specs?.type === 'ram' ? product.specs : undefined;

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
      memoryType: specs?.memoryType ?? '',
      speedMHz: specs?.speedMHz ?? 0,
      capacityGB: specs?.capacityGB ?? 0,
      modules: specs?.modules ?? 0,
      casLatency: specs?.casLatency ?? null,
      voltage: specs?.voltage ?? null,
    },
    validators: { onChange: ramProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value, categoryId);
    },
  });
}
