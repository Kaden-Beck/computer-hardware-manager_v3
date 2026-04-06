import React, { useState } from 'react';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { LabelWithTooltip } from '@/components/ui/label-with-tooltip';
import { ProductBaseFields } from '../ProductBaseFields';
import type { ProductSpecFormProps } from './AddBaseProductForm';
import {
  useAddMotherboardForm,
  type MotherboardFormValues,
} from '@/hooks/form/product/add/useAddMotherboardForm';
import { useQuery } from '@tanstack/react-query';
import { allManufacturersQueryOptions } from '@/lib/queries/manufacturerQueries';
import { ArrowLeft } from 'lucide-react';

export function MotherboardProductForm({
  onSuccess,
  onBack,
  onAdd,
}: ProductSpecFormProps): React.JSX.Element {
  const [pendingValues, setPendingValues] =
    useState<MotherboardFormValues | null>(null);

  const { data: manufacturers = [] } = useQuery(allManufacturersQueryOptions);
  const form = useAddMotherboardForm({
    onSubmit: async (values) => {
      setPendingValues(values);
    },
  });

  function handleConfirm() {
    if (pendingValues) {
      onAdd({
        name: pendingValues.name,
        sku: pendingValues.sku,
        description: pendingValues.description,
        color: pendingValues.color || undefined,
        msrp: pendingValues.msrp,
        price: pendingValues.price ?? undefined,
        quantity: pendingValues.quantity,
        manufacturerId: pendingValues.manufacturerId,
      });
    }
    setPendingValues(null);
    onSuccess();
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="flex items-center gap-1 mt-3 mx-2 text-muted-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        Change category
      </Button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-5 mt-6 px-4"
      >
        <ProductBaseFields form={form} manufacturers={manufacturers} />

        <FieldGroup>
          <form.Field name="socketType">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Socket Type"
                  tip="CPU socket supported (e.g. LGA1700, AM5)."
                />
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.target.value)
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  placeholder="e.g. LGA1700"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="chipset">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Chipset"
                  tip="Motherboard chipset (e.g. Z790, X670E)."
                />
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.target.value)
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  placeholder="e.g. Z790"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="formFactor">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Form Factor"
                  tip="Board form factor (e.g. ATX, Micro-ATX, Mini-ITX)."
                />
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.target.value)
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  placeholder="e.g. ATX"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="memoryType">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Memory Type"
                  tip="Supported RAM type (e.g. DDR5, DDR4)."
                />
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.target.value)
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  placeholder="e.g. DDR5"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="memorySlots">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Memory Slots"
                  tip="Number of DIMM slots."
                />
                <Input
                  id={field.name}
                  type="number"
                  min={1}
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(parseInt(e.target.value, 10) || 0)
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  placeholder="e.g. 4"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="maxMemoryGB">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Max Memory (GB)"
                  tip="Maximum supported RAM in gigabytes."
                />
                <Input
                  id={field.name}
                  type="number"
                  min={1}
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(parseInt(e.target.value, 10) || 0)
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  placeholder="e.g. 192"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="m2Slots">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="M.2 Slots"
                  tip="Number of M.2 slots (optional)."
                />
                <Input
                  id={field.name}
                  type="number"
                  min={0}
                  value={field.state.value ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(
                      e.target.value === ''
                        ? null
                        : parseInt(e.target.value, 10)
                    )
                  }
                  onBlur={field.handleBlur}
                  placeholder="e.g. 5"
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="sataSlots">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="SATA Slots"
                  tip="Number of SATA ports (optional)."
                />
                <Input
                  id={field.name}
                  type="number"
                  min={0}
                  value={field.state.value ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(
                      e.target.value === ''
                        ? null
                        : parseInt(e.target.value, 10)
                    )
                  }
                  onBlur={field.handleBlur}
                  placeholder="e.g. 6"
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="pciSlots">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="PCIe Slots"
                  tip="Number of PCIe expansion slots (optional)."
                />
                <Input
                  id={field.name}
                  type="number"
                  min={0}
                  value={field.state.value ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(
                      e.target.value === ''
                        ? null
                        : parseInt(e.target.value, 10)
                    )
                  }
                  onBlur={field.handleBlur}
                  placeholder="e.g. 3"
                />
              </Field>
            )}
          </form.Field>
        </FieldGroup>

        <div className="flex gap-3 mb-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <form.Subscribe selector={(state) => state.canSubmit}>
            {(canSubmit) => (
              <Button type="submit" disabled={!canSubmit} className="px-8">
                Save
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>

      <AlertDialog
        open={!!pendingValues}
        onOpenChange={(open) => {
          if (!open) setPendingValues(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm New Motherboard</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-1 text-sm">
                {pendingValues && (
                  <>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        Name
                      </span>
                      <span>{pendingValues.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        SKU
                      </span>
                      <span>{pendingValues.sku}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        Socket
                      </span>
                      <span>{pendingValues.socketType}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        Chipset
                      </span>
                      <span>{pendingValues.chipset}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        Form Factor
                      </span>
                      <span>{pendingValues.formFactor}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        Memory
                      </span>
                      <span>
                        {pendingValues.memoryType} · {pendingValues.memorySlots}{' '}
                        slots · {pendingValues.maxMemoryGB} GB max
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        MSRP
                      </span>
                      <span>${pendingValues.msrp.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        Quantity
                      </span>
                      <span>{pendingValues.quantity}</span>
                    </div>
                  </>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
