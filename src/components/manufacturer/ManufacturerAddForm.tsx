import React, { useState } from 'react';
// Shadcn
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

// TanStack Form hook
import {
  useAddManufacturerForm,
  type ManufacturerFormValues,
} from '@/hooks/form/manufacturer/useAddManufacturerForm';
import { addManufacturer } from '@/db/mutation/manufacturer/addManufacturer';
import { useQueryClient } from '@tanstack/react-query';

interface ManufacturerAddFormProps {
  onSuccess: () => void;
}

export default function ManufacturerAddForm({
  onSuccess,
}: ManufacturerAddFormProps): React.JSX.Element {
  const queryClient = useQueryClient();
  const [pendingValues, setPendingValues] =
    useState<ManufacturerFormValues | null>(null);

  const form = useAddManufacturerForm({
    onSubmit: async (values) => {
      setPendingValues(values);
    },
  });

  async function handleConfirm() {
    if (pendingValues) {
      await addManufacturer(pendingValues);
      await queryClient.invalidateQueries({ queryKey: ['manufacturers'] });
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
        <FieldGroup>
          <form.Field name="name">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Name"
                  tip="The display name of this manufacturer."
                />
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.target.value)
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  placeholder="e.g. Corsair"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Description"
                  tip="A brief description shown in manufacturer listings."
                />
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    field.handleChange(e.target.value)
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  placeholder="e.g. Produces RAM, PSUs, and peripherals."
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => state.canSubmit}>
            {(canSubmit) => (
              <Button
                type="submit"
                disabled={!canSubmit}
                className="w-fit px-8"
              >
                Save
              </Button>
            )}
          </form.Subscribe>
        </FieldGroup>
      </form>

      <AlertDialog
        open={!!pendingValues}
        onOpenChange={(open) => {
          if (!open) setPendingValues(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm New Manufacturer</AlertDialogTitle>
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
                        Description
                      </span>
                      <span>{pendingValues.description}</span>
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
