import { useForm } from '@tanstack/react-form';
import {
  cpuProductSchema,
  type CpuFormValues,
} from '@/lib/validators/product/cpu';
import type { Product } from '@/schema/Product';

export type { CpuFormValues };

interface UseCpuProductFormOptions {
  categoryId: string;
  product?: Product;
  onSubmit: (values: CpuFormValues, categoryId: string) => Promise<void>;
}

export function useCpuProductForm({
  categoryId,
  product,
  onSubmit,
}: UseCpuProductFormOptions) {
  const specs = product?.specs?.type === 'cpu' ? product.specs : undefined;

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
      cores: specs?.cores ?? 0,
      threads: specs?.threads ?? 0,
      baseClockGHz: specs?.baseClockGHz ?? 0,
      boostClockGHz: specs?.boostClockGHz ?? null,
      tdp: specs?.tdp ?? 0,
      socketType: specs?.socketType ?? '',
      integratedGraphics: specs?.integratedGraphics ?? false,
      cacheMB: specs?.cacheMB ?? null,
    },
    validators: { onChange: cpuProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value, categoryId);
    },
  });
}
