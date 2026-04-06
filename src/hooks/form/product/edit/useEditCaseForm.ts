import { useForm } from '@tanstack/react-form';
import {
  caseProductSchema,
  type CaseFormValues,
} from '@/lib/validators/product/case';
import type { Product } from '@/schema/Product';

export type { CaseFormValues };

interface UseCaseProductFormOptions {
  categoryId: string;
  product?: Product;
  onSubmit: (values: CaseFormValues, categoryId: string) => Promise<void>;
}

export function useCaseProductForm({
  categoryId,
  product,
  onSubmit,
}: UseCaseProductFormOptions) {
  const specs = product?.specs?.type === 'case' ? product.specs : undefined;

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
      formFactor: specs?.formFactor ?? '',
      moboSupport: specs?.moboSupport ?? '',
      maxGPULengthMM: specs?.maxGPULengthMM ?? null,
      maxCPUCoolerHeightMM: specs?.maxCPUCoolerHeightMM ?? null,
      maxPSULengthMM: specs?.maxPSULengthMM ?? null,
      driveSlotsTwoHalf: specs?.driveSlotsTwoHalf ?? null,
      driveSlotsThreeHalf: specs?.driveSlotsThreeHalf ?? null,
      fanSlots: specs?.fanSlots ?? null,
      radiatorSupport: specs?.radiatorSupport ?? '',
    },
    validators: { onChange: caseProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value, categoryId);
    },
  });
}
