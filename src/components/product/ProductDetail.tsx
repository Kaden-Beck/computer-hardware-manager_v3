import type React from 'react';
import { useParams } from '@tanstack/react-router';
import { productDetails } from '@/data/stub/productData';
import { manufacturerDetails } from '@/data/stub/manufacturerData';
import { categoryDetails } from '@/data/stub/categoryData';

export default function ProductDetailComponent(): React.JSX.Element | null {
  const { prodId } = useParams({ from: '/dashboard/products/$prodId' });
  const product = productDetails.find((p) => p.id === prodId);

  if (!product) return <div>Product not found.</div>;

  const manufacturer = manufacturerDetails.find(
    (m) => m.id === product.manufacturerId
  );
  const category = categoryDetails.find((c) => c.id === product.categoryId);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-muted-foreground">ID</p>
        <p>{product.id}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Name</p>
        <p>{product.name}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">SKU</p>
        <p>{product.sku}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Description</p>
        <p>{product.description}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Manufacturer</p>
        <p>{manufacturer?.name ?? product.manufacturerId}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Category</p>
        <p>{category?.name ?? product.categoryId}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">MSRP</p>
        <p>${product.msrp.toFixed(2)}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Quantity</p>
        <p>{product.quantity}</p>
      </div>
      {product.color && (
        <div>
          <p className="text-sm text-muted-foreground">Color</p>
          <p>{product.color}</p>
        </div>
      )}
      {product.price !== undefined && (
        <div>
          <p className="text-sm text-muted-foreground">Sale Price</p>
          <p>${product.price.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
