import { useForm } from '@tanstack/react-form';
import {
  cpuCoolerProductSchema,
  type CpuCoolerFormValues,
} from '@/lib/validators/product/cpuCooler';
import type { Product } from '@/schema/Product';

export type { CpuCoolerFormValues };

interface UseCpuCoolerProductFormOptions {
  categoryId: string;
  product?: Product;
  onSubmit: (values: CpuCoolerFormValues, categoryId: string) => Promise<void>;
}

export function useCpuCoolerProductForm({
  categoryId,
  product,
  onSubmit,
}: UseCpuCoolerProductFormOptions) {
  const specs =
    product?.specs?.type === 'cpuCooler' ? product.specs : undefined;

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
      coolerType: specs?.coolerType ?? 'Air',
      fanSizeMM: specs?.fanSizeMM ?? 0,
      maxTDP: specs?.maxTDP ?? 0,
      socketCompatibility: specs?.socketCompatibility ?? '',
      heightMM: specs?.heightMM ?? 0,
      radiatorSizeMM: specs?.radiatorSizeMM ?? null,
    },
    validators: { onChange: cpuCoolerProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value, categoryId);
    },
  });
}
