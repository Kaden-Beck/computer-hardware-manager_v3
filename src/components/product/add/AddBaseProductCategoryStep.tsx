import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field } from '@/components/ui/field';
import { LabelWithTooltip } from '@/components/ui/label-with-tooltip';
import { getProductSpecType } from '@/lib/productFormMap';
import { allCategoriesQueryOptions } from '@/lib/queries/categories';

interface ProductCategoryStepProps {
  onNext: (categoryId: string) => void;
}

export function ProductCategoryStep({
  onNext,
}: ProductCategoryStepProps): React.JSX.Element {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const { data: categories = [] } = useQuery(allCategoriesQueryOptions);

  const parentCategories = categories.filter((c) => c.isParent);
  const childCategories = categories.filter((c) => !c.isParent);

  // Only allow selecting categories that have a known spec form
  const isSelectable = (id: string) => !!getProductSpecType(id);

  function handleNext() {
    if (selectedCategoryId && isSelectable(selectedCategoryId)) {
      onNext(selectedCategoryId);
    }
  }

  return (
    <div className="flex flex-col gap-5 mt-6 px-4">
      <Field>
        <LabelWithTooltip
          htmlFor="category-select"
          label="Category"
          tip="Select the type of product you are adding. This determines which spec fields will appear."
        />
        <Select
          value={selectedCategoryId}
          onValueChange={setSelectedCategoryId}
        >
          <SelectTrigger id="category-select">
            <SelectValue placeholder="Select a category..." />
          </SelectTrigger>
          <SelectContent>
            {parentCategories.map((parent) => {
              const children = childCategories.filter(
                (c) => c.parentId === parent.id
              );
              if (children.length > 0) {
                return (
                  <SelectGroup key={parent.id}>
                    <SelectLabel>{parent.name}</SelectLabel>
                    {isSelectable(parent.id) && (
                      <SelectItem value={parent.id}>
                        {parent.name} (all)
                      </SelectItem>
                    )}
                    {children.map((child) => (
                      <SelectItem key={child.id} value={child.id}>
                        {child.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                );
              }
              return (
                <SelectItem key={parent.id} value={parent.id}>
                  {parent.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </Field>

      <Button
        onClick={handleNext}
        disabled={!selectedCategoryId || !isSelectable(selectedCategoryId)}
        className="w-fit px-8"
      >
        Next
      </Button>
    </div>
  );
}
