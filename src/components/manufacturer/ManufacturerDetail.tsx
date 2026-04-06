import { useState } from 'react';
import type React from 'react';
import ProductCard from '@/components/inventory/ProductCard';
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  useParams,
  Link,
  Outlet,
  useMatch,
  useNavigate,
} from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { manufacturerByIdQueryOptions } from '@/lib/queries/manufacturerQueries';
import { allProductsQueryOptions } from '@/lib/queries/productQueries';
import { useRemoveManufacturer } from '@/lib/queries/manufacturerMutations';

function ManufacturerDetailSkeleton(): React.JSX.Element {
  return (
    <div className="bg-background border rounded-lg overflow-hidden w-full p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-stretch">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-40 rounded" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-48 rounded" />
            <Skeleton className="h-4 w-64 rounded" />
          </div>
        </div>
        <div className="flex flex-col h-full">
          <Skeleton className="h-9 w-24 rounded mt-auto" />
        </div>
      </div>
    </div>
  );
}

export default function ManufacturerDetailComponent(): React.JSX.Element {
  const { manId } = useParams({ from: '/dashboard/manufacturers/$manId' });
  const { data: manufacturer, isPending } = useQuery(manufacturerByIdQueryOptions(manId));
  const { data: allProducts = [] } = useQuery(allProductsQueryOptions);

  const isEditing = !!useMatch({
    from: '/dashboard/manufacturers/$manId/edit',
    shouldThrow: false,
  });

  const navigate = useNavigate();
  const { mutate: removeManufacturer } = useRemoveManufacturer();
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (isPending) {
    return (
      <div className="flex flex-col gap-6">
        <ManufacturerDetailSkeleton />
      </div>
    );
  }

  if (!manufacturer) return <div>Manufacturer not found.</div>;

  const products = allProducts.filter((p) => p.manufacturerId === manId);
  const specs = [`ID: ${manufacturer.id}`, manufacturer.description];

  function handleDelete() {
    removeManufacturer(manufacturer!.id, {
      onSuccess: () => navigate({ to: '/dashboard/manufacturers' }),
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        className={cn(
          'bg-background text-foreground border rounded-lg overflow-hidden w-full p-4 md:p-6'
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-stretch">
          {/* Column 1: Details */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-foreground">
              {manufacturer.name}
            </h2>
            <ul className="space-y-2 text-sm list-none text-muted-foreground pt-2">
              {specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Column 2: Actions */}
          <div className="flex flex-col h-full">
            {isEditing ? (
              <Button asChild variant="outline" className="mt-auto w-fit px-8">
                <Link
                  to="/dashboard/manufacturers/$manId"
                  params={{ manId: manufacturer.id }}
                >
                  Cancel
                </Link>
              </Button>
            ) : (
              <div className="flex flex-col gap-2 mt-auto">
                <Button asChild className="w-fit px-8">
                  <Link
                    to="/dashboard/manufacturers/$manId/edit"
                    params={{ manId: manufacturer.id }}
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

      {isEditing ? (
        <Outlet />
      ) : (
        products.length > 0 && (
          <div className="px-12">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Products by {manufacturer.name}
            </h3>
            <Carousel opts={{ align: 'start' }}>
              <CarouselContent>
                {products.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <ProductCard product={product} compact />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )
      )}

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {manufacturer.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The manufacturer will be permanently
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
