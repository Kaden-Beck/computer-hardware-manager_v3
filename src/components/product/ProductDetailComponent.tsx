import type React from 'react';
import { useParams, Link, Outlet, useMatch } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { productByIdQueryOptions } from '@/lib/queries/products';
import { manufacturerByIdQueryOptions } from '@/lib/queries/manufacturers';
import { categoryByIdQueryOptions } from '@/lib/queries/categories';
import { cn } from '@/lib/utils';

export default function ProductDetailComponent(): React.JSX.Element | null {
  const { prodId } = useParams({ from: '/dashboard/products/$prodId' });
  const { data: product } = useQuery(productByIdQueryOptions(prodId));
  const isEditing = !!useMatch({
    from: '/dashboard/products/$prodId/edit',
    shouldThrow: false,
  });

  const { data: manufacturer } = useQuery(
    manufacturerByIdQueryOptions(product?.manufacturerId ?? '')
  );
  const { data: category } = useQuery(
    categoryByIdQueryOptions(product?.categoryId ?? '')
  );

  if (!product) return <div>Product not found.</div>;

  const specs = [
    `SKU: ${product.sku}`,
    product.description,
    ...(product.color ? [`Color: ${product.color}`] : []),
    `In Stock: ${product.quantity} units`,
  ];

  return (
    <div className="flex flex-col gap-6">
      <div
        className={cn(
          'bg-background text-foreground border rounded-lg overflow-hidden w-full p-4 md:p-6'
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 items-stretch">
          {/* Column 1: Image */}
          <div className="w-full aspect-square max-w-50 mx-auto bg-muted rounded-md overflow-hidden">
            <img
              src={`https://placehold.co/200x200/f3f4f6/6b7280?text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              width={200}
              height={200}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Column 2: Product Details */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-foreground">
              {product.name}
            </h2>
            <ul className="space-y-2 text-sm list-none text-muted-foreground pt-2">
              <li>
                Manufacturer:{' '}
                <Link
                  to="/dashboard/manufacturers/$manId"
                  params={{ manId: product.manufacturerId }}
                  className="text-primary hover:underline"
                >
                  {manufacturer?.name ?? product.manufacturerId}
                </Link>
              </li>
              <li>
                Category:{' '}
                <Link
                  to="/dashboard/categories/$catId"
                  params={{ catId: product.categoryId }}
                  className="text-primary hover:underline"
                >
                  {category?.name ?? product.categoryId}
                </Link>
              </li>
              {specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pricing + Action */}
          <div className="flex flex-col gap-1 h-full">
            <h3 className="text-3xl font-bold">${product.msrp.toFixed(2)}</h3>
            <p className="text-sm text-muted-foreground">MSRP</p>
            {isEditing ? (
              <Button asChild variant="outline" className="mt-auto w-fit px-8">
                <Link
                  to="/dashboard/products/$prodId"
                  params={{ prodId: product.id }}
                >
                  Cancel
                </Link>
              </Button>
            ) : (
              <Button asChild className="mt-auto w-fit px-8">
                <Link
                  to="/dashboard/products/$prodId/edit"
                  params={{ prodId: product.id }}
                >
                  Edit
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {isEditing && <Outlet />}
    </div>
  );
}
