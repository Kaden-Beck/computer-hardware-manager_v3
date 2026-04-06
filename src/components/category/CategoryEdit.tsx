import React from 'react';
// Tanstack Imports
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { categoryByIdQueryOptions } from '@/lib/queries/categoryQueries';
import CategoryEditForm from './CategoryEditForm';

export default function CategoryEditComponent(): React.JSX.Element {
  const { catId } = useParams({
    from: '/dashboard/categories/$catId/edit',
  });
  const { data: category } = useQuery(categoryByIdQueryOptions(catId));

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
