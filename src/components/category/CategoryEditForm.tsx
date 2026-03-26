import React, { useState } from 'react';
// Shadcn
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
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

// Tanstack Form hook
import {
  useCategoryForm,
  type CategoryFormValues,
} from '@/hooks/form/useCategoryForm';

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
  const [pendingValues, setPendingValues] = useState<CategoryFormValues | null>(
    null
  );

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
      setPendingValues(values);
    },
  });

  function handleConfirm() {
    // TODO: wire up mutation
    console.log('submit', pendingValues);
    setPendingValues(null);
  }

  const parentName = (id: string) =>
    parentCategories.find((c) => c.id === id)?.name ?? id;

  type SummaryRow = { label: string; value: string; changed: boolean };

  function buildSummary(values: CategoryFormValues): SummaryRow[] {
    const rows: SummaryRow[] = [
      {
        label: 'Name',
        value: values.name,
        changed: values.name !== category.name,
      },
      {
        label: 'Description',
        value: values.description,
        changed: values.description !== category.description,
      },
      {
        label: 'Top-level',
        value: values.isParent ? 'Yes' : 'No',
        changed: values.isParent !== category.isParent,
      },
    ];

    if (!values.isParent) {
      rows.push({
        label: 'Parent Category',
        value: values.parentId ? parentName(values.parentId) : '—',
        changed: values.parentId !== category.parentId,
      });
    }

    rows.push({
      label: 'Misc Details',
      value: values.miscDetails || '—',
      changed: values.miscDetails !== category.miscDetails,
    });

    return rows;
  }

  return (
    <>
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
                  tip={
                    category.isParent
                      ? 'Root category names cannot be changed.'
                      : 'The display name of this category.'
                  }
                />
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.target.value)
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  placeholder="e.g. GPU"
                  disabled={category.isParent}
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
                  tip="A brief description shown in category listings."
                />
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
                      if (checked)
                        form.setFieldValue('parentId', category.parentId);
                    }}
                    onBlur={field.handleBlur}
                  />
                  <LabelWithTooltip
                    htmlFor={field.name}
                    label="Top-level category"
                    tip="Top-level categories are root categories. Disable to nest this category under a parent."
                  />
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
                    <LabelWithTooltip
                      htmlFor={field.name}
                      label="Parent Category"
                      tip="The root category this belongs to. Only applicable when Top-level is off."
                    />
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
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Misc Details"
                  tip="Optional free-text notes or extra details about this category."
                />
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
              <Button
                type="submit"
                disabled={!canSubmit}
                className="w-fit px-8"
              >
                Save Changes
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
            <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-1 text-sm">
                {pendingValues &&
                  buildSummary(pendingValues).map(
                    ({ label, value, changed }) => (
                      <div key={label} className="flex gap-2">
                        <span className="text-muted-foreground w-32 shrink-0">
                          {label}
                        </span>
                        <span
                          className={changed ? 'font-bold text-foreground' : ''}
                        >
                          {value}
                        </span>
                      </div>
                    )
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
