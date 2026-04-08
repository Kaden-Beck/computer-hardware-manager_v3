import { useState } from 'react';
import type React from 'react';
import {
  useParams,
  Link,
  Outlet,
  useMatch,
  useNavigate,
} from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useQuery } from '@tanstack/react-query';
import { productByIdQueryOptions } from '@/lib/queries/productQueries';
import { manufacturerByIdQueryOptions } from '@/lib/queries/manufacturerQueries';
import { categoryByIdQueryOptions } from '@/lib/queries/categoryQueries';
import { useRemoveProduct } from '@/lib/queries/productMutations';
import { cn } from '@/lib/utils';

function ProductDetailSkeleton(): React.JSX.Element {
  return (
    <div className="bg-background border rounded-lg overflow-hidden w-full p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 items-stretch">
        <Skeleton className="w-full aspect-square max-w-50 mx-auto rounded-md" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-48 rounded" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-40 rounded" />
            <Skeleton className="h-4 w-36 rounded" />
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-4 w-44 rounded" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-24 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
          <Skeleton className="h-9 w-24 rounded mt-auto" />
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailComponent(): React.JSX.Element | null {
  const { prodId } = useParams({ from: '/dashboard/products/$prodId' });
  const { data: product, isPending } = useQuery(
    productByIdQueryOptions(prodId)
  );
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

  const navigate = useNavigate();
  const { mutate: removeProduct } = useRemoveProduct();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isPending) {
    return (
      <div className="flex flex-col gap-6">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) return <div>Product not found.</div>;

  function handleDelete() {
    removeProduct(product!.id, {
      onSuccess: () => navigate({ to: '/dashboard/products' }),
    });
  }

  const specs = [
    `SKU: ${product.sku}`,
    product.description,
    ...(product.color ? [`Color: ${product.color}`] : []),
    `In Stock: ${product.quantity} units`,
  ];

  const imageSrc =
    product.images?.find((img) => img.isPrimary)?.url ??
    product.images?.[0]?.url ??
    `https://placehold.co/200x200/f3f4f6/6b7280?text=${encodeURIComponent(product.name)}`;

  return (
    <div className="flex flex-col gap-6">
      <div
        className={cn(
          'bg-background text-foreground border rounded-lg overflow-hidden w-full p-4 md:p-6'
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 items-stretch">
          {/* Column 1: Image */}
          <div className="w-full aspect-square max-w-50 mx-auto bg-muted rounded-md overflow-hidden relative">
            {!imageLoaded && (
              <Skeleton className="absolute inset-0 w-full h-full rounded-md" />
            )}
            <img
              src={imageSrc}
              alt={
                product.images?.find((img) => img.isPrimary)?.altText ??
                product.name
              }
              width={200}
              height={200}
              onLoad={() => setImageLoaded(true)}
              className={cn(
                'object-contain w-full h-full transition-opacity duration-300',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
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
                {manufacturer ? (
                  <Link
                    to="/dashboard/manufacturers/$manId"
                    params={{ manId: product.manufacturerId }}
                    className="text-primary hover:underline"
                  >
                    {manufacturer.name}
                  </Link>
                ) : (
                  <Skeleton className="inline-block h-3 w-24 rounded align-middle" />
                )}
              </li>
              <li>
                Category:{' '}
                {category ? (
                  <Link
                    to="/dashboard/categories/$catId"
                    params={{ catId: product.categoryId }}
                    className="text-primary hover:underline"
                  >
                    {category.name}
                  </Link>
                ) : (
                  <Skeleton className="inline-block h-3 w-24 rounded align-middle" />
                )}
              </li>
              {specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pricing + Actions */}
          <div className="flex flex-col gap-2 h-full">
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
              <div className="flex flex-col gap-2 mt-auto">
                <Button asChild className="w-fit px-8">
                  <Link
                    to="/dashboard/products/$prodId/edit"
                    params={{ prodId: product.id }}
                  >
                    Edit
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  className="w-fit px-8"
                  onClick={() => setConfirmDelete(true)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditing && <Outlet />}

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {product.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The product will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
