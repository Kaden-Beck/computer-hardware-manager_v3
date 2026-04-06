import React, { useState } from 'react';
// Shadcn
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';

// TanStack Form hook
import {
  useAddCategoryForm,
  type AddCategoryFormValues,
} from '@/hooks/form/category/useAddCategoryForm';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { allCategoriesQueryOptions } from '@/lib/queries/categories';
import { addCategory } from '@/db/mutation/category/addCategory';

interface CategoryAddFormProps {
  onSuccess: () => void;
}

export default function CategoryAddForm({
  onSuccess,
}: CategoryAddFormProps): React.JSX.Element {
  const [pendingValues, setPendingValues] =
    useState<AddCategoryFormValues | null>(null);
  const queryClient = useQueryClient();
  const { data: allCategories = [] } = useQuery(allCategoriesQueryOptions);

  const parentCategories = allCategories.filter((c) => c.isParent);

  const form = useAddCategoryForm({
    onSubmit: async (values) => {
      setPendingValues(values);
    },
  });

  const handleConfirm = async () => {
    if (pendingValues) {
      await addCategory({ isParent: false, ...pendingValues });
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
    setPendingValues(null);
    onSuccess();
  };

  const parentName = (id: string) =>
    parentCategories.find((c) => c.id === id)?.name ?? id;

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
                  tip="The display name of this category."
                />
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.target.value)
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  placeholder="e.g. Mini-ITX GPU"
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

          <form.Field name="parentId">
            {(field) => (
              <Field>
                <LabelWithTooltip
                  htmlFor={field.name}
                  label="Parent Category"
                  tip="The root category this belongs to."
                />
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val)}
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
            <AlertDialogTitle>Confirm New Category</AlertDialogTitle>
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
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-32 shrink-0">
                        Parent Category
                      </span>
                      <span>{parentName(pendingValues.parentId)}</span>
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
