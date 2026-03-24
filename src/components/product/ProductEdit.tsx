import type React from 'react';
import { useParams } from '@tanstack/react-router';

export default function ProductEditComponent(): React.JSX.Element {
  const { prodId } = useParams({ from: '/dashboard/products/$prodId/edit' });
  return <div>Edit product {prodId}</div>;
}
