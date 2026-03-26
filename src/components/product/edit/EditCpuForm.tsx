import React, { useState } from 'react';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
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
import type { ProductSpecEditFormProps } from './EditBaseProductForm';
import {
  useCpuProductForm,
  type CpuProductFormValues,
} from '@/hooks/form/product/useCpuProductForm';
import { manufacturerDetails } from '@/data/stub/manufacturerData';

export function CpuProductEditForm({
  product,
  onSuccess,
  onEdit,
}: ProductSpecEditFormProps): React.JSX.Element {
  const [pendingValues, setPendingValues] =
    useState<CpuProductFormValues | null>(null);

  const form = useCpuProductForm({
    categoryId: product.categoryId,
    defaultValues: product,
    onSubmit: async (values) => {
      setPendingValues(values);
    },
  });

  function handleConfirm() {
    if (pendingValues) {
      onEdit({
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-5 mt-6 px-4"
      >
        <ProductBaseFields form={form} manufacturers={manufacturerDetails} />

        <FieldGroup>
          <form.Field name="socketType">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Socket Type"
                  tip="CPU socket (e.g. LGA1700, AM5)."
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

          <form.Field name="cores">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Cores"
                  tip="Total number of CPU cores."
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
                  placeholder="e.g. 24"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="threads">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Threads"
                  tip="Total number of CPU threads."
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
                  placeholder="e.g. 32"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="baseClockGHz">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Base Clock (GHz)"
                  tip="Base CPU clock speed in gigahertz."
                />
                <Input
                  id={field.name}
                  type="number"
                  min={0.1}
                  step={0.1}
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(parseFloat(e.target.value) || 0)
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  placeholder="e.g. 3.4"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="boostClockGHz">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Boost Clock (GHz)"
                  tip="Maximum boost clock speed in gigahertz (optional)."
                />
                <Input
                  id={field.name}
                  type="number"
                  min={0.1}
                  step={0.1}
                  value={field.state.value ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(
                      e.target.value === '' ? null : parseFloat(e.target.value)
                    )
                  }
                  onBlur={field.handleBlur}
                  placeholder="e.g. 5.8"
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="tdp">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="TDP (W)"
                  tip="Thermal design power in watts."
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
                  placeholder="e.g. 125"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="cacheMB">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Cache (MB)"
                  tip="Total cache size in megabytes (optional)."
                />
                <Input
                  id={field.name}
                  type="number"
                  min={1}
                  value={field.state.value ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(
                      e.target.value === ''
                        ? undefined
                        : parseInt(e.target.value, 10)
                    )
                  }
                  onBlur={field.handleBlur}
                  placeholder="e.g. 36"
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="integratedGraphics">
            {(field) => (
              <Field>
                <div className="flex items-center gap-3">
                  <Switch
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) => field.handleChange(checked)}
                  />
                  <LabelWithTooltip
                    htmlFor={field.name}
                    label="Integrated Graphics"
                    tip="Whether the CPU includes an integrated GPU."
                  />
                </div>
              </Field>
            )}
          </form.Field>
        </FieldGroup>

        <div className="flex gap-3 mb-6">
          <form.Subscribe selector={(state) => state.canSubmit}>
            {(canSubmit) => (
              <Button type="submit" disabled={!canSubmit} className="px-8">
                Save Changes
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
            <AlertDialogTitle>Confirm Changes to CPU</AlertDialogTitle>
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
                        Cores / Threads
                      </span>
                      <span>
                        {pendingValues.cores} / {pendingValues.threads}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        Base Clock
                      </span>
                      <span>{pendingValues.baseClockGHz} GHz</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        TDP
                      </span>
                      <span>{pendingValues.tdp} W</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        iGPU
                      </span>
                      <span>
                        {pendingValues.integratedGraphics ? 'Yes' : 'No'}
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
