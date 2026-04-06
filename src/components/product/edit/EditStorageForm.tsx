import React, { useState } from 'react';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  useStorageProductForm,
  type StorageFormValues,
} from '@/hooks/form/product/edit/useEditStorageForm';
import { useQuery } from '@tanstack/react-query';
import { allManufacturersQueryOptions } from '@/lib/queries/manufacturerQueries';

export function StorageProductEditForm({
  product,
  onSuccess,
  onEdit,
}: ProductSpecEditFormProps): React.JSX.Element {
  const [pendingValues, setPendingValues] = useState<StorageFormValues | null>(
    null
  );

  const { data: manufacturers = [] } = useQuery(allManufacturersQueryOptions);
  const form = useStorageProductForm({
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
        <ProductBaseFields form={form} manufacturers={manufacturers} />

        <FieldGroup>
          <form.Field name="storageType">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Storage Type"
                  tip="Drive technology type."
                />
                <Select
                  value={field.state.value}
                  onValueChange={(val) =>
                    field.handleChange(val as StorageFormValues['storageType'])
                  }
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={field.state.meta.errors.length > 0}
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SSD">SSD</SelectItem>
                    <SelectItem value="HDD">HDD</SelectItem>
                    <SelectItem value="NVMe">NVMe</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="capacityGB">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Capacity (GB)"
                  tip="Storage capacity in gigabytes."
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
                  placeholder="e.g. 2000"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="interface">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Interface"
                  tip="Connection interface (e.g. PCIe 5.0 x4, SATA III)."
                />
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.target.value)
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  placeholder="e.g. PCIe 5.0 x4"
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
                  tip='Physical form factor (e.g. M.2 2280, 2.5")'
                />
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.target.value)
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  placeholder="e.g. M.2 2280"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="readSpeedMBps">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Read Speed (MB/s)"
                  tip="Sequential read speed in MB/s (optional)."
                />
                <Input
                  id={field.name}
                  type="number"
                  min={1}
                  value={field.state.value ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(
                      e.target.value === ''
                        ? null
                        : parseInt(e.target.value, 10)
                    )
                  }
                  onBlur={field.handleBlur}
                  placeholder="e.g. 14900"
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="writeSpeedMBps">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Write Speed (MB/s)"
                  tip="Sequential write speed in MB/s (optional)."
                />
                <Input
                  id={field.name}
                  type="number"
                  min={1}
                  value={field.state.value ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(
                      e.target.value === ''
                        ? null
                        : parseInt(e.target.value, 10)
                    )
                  }
                  onBlur={field.handleBlur}
                  placeholder="e.g. 12000"
                />
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
            <AlertDialogTitle>Confirm Changes to Storage</AlertDialogTitle>
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
                        Type
                      </span>
                      <span>{pendingValues.storageType}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        Capacity
                      </span>
                      <span>{pendingValues.capacityGB} GB</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        Interface
                      </span>
                      <span>{pendingValues.interface}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        Form Factor
                      </span>
                      <span>{pendingValues.formFactor}</span>
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
