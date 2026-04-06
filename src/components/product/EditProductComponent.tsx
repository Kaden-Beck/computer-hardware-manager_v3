import React from 'react';
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productByIdQueryOptions } from '@/lib/queries/productQueries';
import ProductEditForm from './edit/EditBaseProductForm';
import ProductImageUpload from './ProductImageUpload';
import { useUpdateProduct } from '@/lib/queries/productMutations';
import type { Product } from '@/schema/Product';

export default function ProductEditComponent(): React.JSX.Element {
  const { prodId } = useParams({ from: '/dashboard/products/$prodId/edit' });
  const { data: product } = useQuery(productByIdQueryOptions(prodId));
  const { mutate: updateProduct } = useUpdateProduct();

  if (!product) return <div>Product not found.</div>;

  function handleEdit(updated: Product) {
    updateProduct({ id: updated.id, data: updated });
  }

  function handleSuccess() {
    // navigation back to detail is handled by ProductDetail's Cancel button
  }

  return (
    <div className="border rounded-lg overflow-hidden flex flex-col gap-6">
      <ProductEditForm
        product={product}
        onSuccess={handleSuccess}
        onEdit={handleEdit}
      />
      <div className="px-4 pb-6 flex flex-col gap-2">
        <h3 className="text-sm font-medium">Images</h3>
        <ProductImageUpload
          productId={product.id}
          images={product.images ?? []}
        />
      </div>
    </div>
  );
}
