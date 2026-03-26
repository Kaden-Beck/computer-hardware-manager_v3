import React from 'react';
// Shadcn
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// Tanstack Form hook
import { useManufacturerForm } from '@/hooks/form/useManufacturerForm';

// Props for pre-populating form
interface ManufacturerEditFormProps {
  manufacturer: { id: string; name: string; description: string };
}

export default function ManufacturerEditForm({
  manufacturer,
}: ManufacturerEditFormProps): React.JSX.Element {
  const form = useManufacturerForm({
    defaultValues: {
      name: manufacturer.name,
      description: manufacturer.description,
    },
    onSubmit: async (values) => {
      // TODO: wire up mutation
      console.log('submit', values);
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
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
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
