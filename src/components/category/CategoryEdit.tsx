import type React from 'react';
import { useParams } from '@tanstack/react-router';

export default function CategoryEditComponent(): React.JSX.Element {
  const { catId } = useParams({ from: '/dashboard/categories/$catId/edit' });
  return <div>Edit category {catId}</div>;
}
