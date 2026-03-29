import React from 'react';
// Tanstack Imports
import { useParams } from '@tanstack/react-router';
// Stub Data
import { categoryDetails } from '@/_static_data/stub/categoryData';
import CategoryEditForm from './CategoryEditForm';

export default function CategoryEditComponent(): React.JSX.Element {
  const { catId } = useParams({
    from: '/dashboard/categories/$catId/edit',
  });
  const category = categoryDetails.find((c) => c.id === catId);

  if (!category) return <div>Category not found.</div>;

  return (
    <CategoryEditForm
      category={{
        id: category.id,
        name: category.name,
        description: category.description,
        isParent: category.isParent,
        parentId: category.parentId ?? '',
        miscDetails: category.miscDetails ?? '',
      }}
    />
  );
}
