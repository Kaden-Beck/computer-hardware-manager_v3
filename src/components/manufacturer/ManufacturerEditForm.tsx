import React from 'react';
// Shadcn
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { LabelWithTooltip } from '@/components/ui/label-with-tooltip';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// Tanstack Form hook
import { useManufacturerForm } from '@/hooks/form/manufacturer/useEditManufacturerForm';
import { useUpdateManufacturer } from '@/lib/queries/manufacturerMutations';

// Props for pre-populating form
interface ManufacturerEditFormProps {
  manufacturer: { id: string; name: string; description: string };
}

export default function ManufacturerEditForm({
  manufacturer,
}: ManufacturerEditFormProps): React.JSX.Element {
  const { mutate: updateManufacturer } = useUpdateManufacturer();

  const form = useManufacturerForm({
    defaultValues: {
      name: manufacturer.name,
      description: manufacturer.description,
    },
    onSubmit: async (values) => {
      updateManufacturer({
        id: manufacturer.id,
        data: { name: values.name, description: values.description },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="border rounded-lg p-4 md:p-6"
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
                placeholder="e.g. NVIDIA"
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
                placeholder="Brief description of the manufacturer"
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => state.canSubmit}>
          {(canSubmit) => (
            <Button type="submit" disabled={!canSubmit} className="w-fit px-8">
              Save Changes
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
