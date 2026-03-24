import type React from 'react';
import { useParams } from '@tanstack/react-router';
import { categoryDetails } from '@/data/stub/categoryData';

export default function CategoryDetailComponent(): React.JSX.Element | null {
  const { catId } = useParams({ from: '/dashboard/categories/$catId' });
  const category = categoryDetails.find((c) => c.id === catId);

  if (!category) return <div>Category not found.</div>;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-muted-foreground">ID</p>
        <p>{category.id}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Name</p>
        <p>{category.name}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Description</p>
        <p>{category.description}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Top-level Category</p>
        <p>{category.isParent ? 'Yes' : 'No'}</p>
      </div>
      {category.parentId && (
        <div>
          <p className="text-sm text-muted-foreground">Parent Category</p>
          <p>
            {categoryDetails.find((c) => c.id === category.parentId)?.name ??
              category.parentId}
          </p>
        </div>
      )}
    </div>
  );
}
