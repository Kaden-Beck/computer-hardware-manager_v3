import { useForm } from '@tanstack/react-form';
import {
  motherboardProductSchema,
  type MotherboardFormValues,
} from '@/lib/validators/product/motherboard';
import type { Product } from '@/schema/Product';

export type { MotherboardFormValues };

interface UseMotherboardProductFormOptions {
  categoryId: string;
  product?: Product;
  onSubmit: (values: MotherboardFormValues, categoryId: string) => Promise<void>;
}

export function useMotherboardProductForm({
  categoryId,
  product,
  onSubmit,
}: UseMotherboardProductFormOptions) {
  const specs =
    product?.specs?.type === 'motherboard' ? product.specs : undefined;

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
      socketType: specs?.socketType ?? '',
      chipset: specs?.chipset ?? '',
      formFactor: specs?.formFactor ?? '',
      memoryType: specs?.memoryType ?? '',
      memorySlots: specs?.memorySlots ?? 0,
      maxMemoryGB: specs?.maxMemoryGB ?? 0,
      m2Slots: specs?.m2Slots ?? null,
      sataSlots: specs?.sataSlots ?? null,
      pciSlots: specs?.pciSlots ?? null,
    },
    validators: { onChange: motherboardProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value, categoryId);
    },
  });
}
