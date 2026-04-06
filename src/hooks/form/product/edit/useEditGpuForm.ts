import { useForm } from '@tanstack/react-form';
import {
  gpuProductSchema,
  type GpuFormValues,
} from '@/lib/validators/product/gpu';
import type { Product } from '@/schema/Product';

export type { GpuFormValues };

interface UseGpuProductFormOptions {
  categoryId: string;
  product?: Product;
  onSubmit: (values: GpuFormValues, categoryId: string) => Promise<void>;
}

export function useGpuProductForm({
  categoryId,
  product,
  onSubmit,
}: UseGpuProductFormOptions) {
  const specs = product?.specs?.type === 'gpu' ? product.specs : undefined;

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
      chipset: specs?.chipset ?? '',
      vramGB: specs?.vramGB ?? 0,
      vramType: specs?.vramType ?? '',
      tdp: specs?.tdp ?? 0,
      coreCount: specs?.coreCount ?? null,
      baseClockMHz: specs?.baseClockMHz ?? null,
      boostClockMHz: specs?.boostClockMHz ?? null,
      lengthMM: specs?.lengthMM ?? null,
      powerConnectors: specs?.powerConnectors ?? '',
    },
    validators: { onChange: gpuProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value, categoryId);
    },
  });
}
