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
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Tanstack Form hook
import { useCategoryForm } from '@/hooks/form/useCategoryForm';

// Stub Data
import { categoryDetails } from '@/data/stub/categoryData';

// Props for pre-populating form
interface CategoryEditFormProps {
  category: {
    id: string;
    name: string;
    description: string;
    isParent: boolean;
    parentId: string;
    miscDetails: string;
  };
}

export default function CategoryEditForm({
  category,
}: CategoryEditFormProps): React.JSX.Element {
  const parentCategories = categoryDetails.filter(
    (c) => c.isParent && c.id !== category.id
  );

  const form = useCategoryForm({
    defaultValues: {
      name: category.name,
      description: category.description,
      isParent: category.isParent,
      parentId: category.parentId,
      miscDetails: category.miscDetails,
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
                placeholder="e.g. GPU"
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
                placeholder="Brief description of the category"
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <form.Field name="isParent">
          {(field) => (
            <Field>
              <div className="flex items-center gap-3">
                <Switch
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => {
                    field.handleChange(checked);
                    if (checked) form.setFieldValue('parentId', category.parentId);
                  }}
                  onBlur={field.handleBlur}
                />
                <FieldLabel htmlFor={field.name}>Top-level category</FieldLabel>
              </div>
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <form.Field name="parentId">
          {(field) => (
            <form.Subscribe selector={(state) => state.values.isParent}>
              {(isParent) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Parent Category</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) => field.handleChange(val)}
                    disabled={isParent}
                  >
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={field.state.meta.errors.length > 0}
                    >
                      <SelectValue placeholder="Select a parent category" />
                    </SelectTrigger>
                    <SelectContent>
                      {parentCategories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Subscribe>
          )}
        </form.Field>

        <form.Field name="miscDetails">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Misc Details</FieldLabel>
              <Textarea
                id={field.name}
                value={field.state.value}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  field.handleChange(e.target.value)
                }
                onBlur={field.handleBlur}
                placeholder="Any additional details"
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
