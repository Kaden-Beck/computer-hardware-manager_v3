import { useForm } from '@tanstack/react-form';
import {
  psuProductSchema,
  type PsuFormValues,
} from '@/lib/validators/product/psu';
import type { Product } from '@/schema/Product';

export type { PsuFormValues };

interface UsePsuProductFormOptions {
  categoryId: string;
  product?: Product;
  onSubmit: (values: PsuFormValues, categoryId: string) => Promise<void>;
}

export function usePsuProductForm({
  categoryId,
  product,
  onSubmit,
}: UsePsuProductFormOptions) {
  const specs = product?.specs?.type === 'psu' ? product.specs : undefined;

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
      wattage: specs?.wattage ?? 0,
      efficiencyRating: specs?.efficiencyRating ?? '',
      modular: specs?.modular ?? 'Full',
      formFactor: specs?.formFactor ?? '',
    },
    validators: { onChange: psuProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value, categoryId);
    },
  });
}
