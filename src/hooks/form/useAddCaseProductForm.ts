import { useForm } from '@tanstack/react-form';
import {
  caseProductSchema,
  type CaseFormValues,
} from '@/lib/validators/product/case';
import type z from 'zod';

export function useAddCaseForm({
  onSubmit,
}: {
  onSubmit: (values: CaseFormValues) => Promise<void>;
}) {
  return useForm({
    defaultValues: {
      name: '',
      sku: '',
      description: '',
      color: '',
      msrp: 0,
      price: null,
      quantity: 1,
      manufacturerId: '',
      formFactor: '',
      moboSupport: '',
      maxGPULengthMM: 0,
      maxCPUCoolerHeightMM: null,
      maxPSULengthMM: null,
      driveSlotsTwoHalf: null,
      driveSlotsThreeHalf: null,
      fanSlots: null,
      radiatorSupport: '',
    } as z.infer<typeof caseProductSchema>,
    validators: { onChange: caseProductSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });
}

export type { CaseFormValues };
