import React from 'react';
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productByIdQueryOptions } from '@/lib/queries/products';
import ProductEditForm from './edit/EditBaseProductForm';
import type { Product } from '@/schema/Product';

export default function ProductEditComponent(): React.JSX.Element {
  const { prodId } = useParams({ from: '/dashboard/products/$prodId/edit' });
  const { data: product } = useQuery(productByIdQueryOptions(prodId));

  if (!product) return <div>Product not found.</div>;

  function handleEdit(updated: Product) {
    // TODO: wire up mutation
    console.log('edit', updated);
  }

  function handleSuccess() {
    // navigation back to detail is handled by ProductDetail's Cancel button
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <ProductEditForm
        product={product}
        onSuccess={handleSuccess}
        onEdit={handleEdit}
      />
    </div>
  );
}
