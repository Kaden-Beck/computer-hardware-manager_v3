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
import { cn } from '@/lib/utils';
import {
  useParams,
  Link,
  Outlet,
  useMatch,
  useNavigate,
} from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import {
  categoryByIdQueryOptions,
  allCategoriesQueryOptions,
} from '@/lib/queries/categoryQueries';
import { allProductsQueryOptions } from '@/lib/queries/productQueries';
import { useRemoveCategory } from '@/lib/queries/categoryMutations';

function CategoryDetailSkeleton(): React.JSX.Element {
  return (
    <div className="bg-background border rounded-lg overflow-hidden w-full p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-stretch">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-40 rounded" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-48 rounded" />
            <Skeleton className="h-4 w-64 rounded" />
            <Skeleton className="h-4 w-32 rounded" />
          </div>
        </div>
        <div className="flex flex-col h-full">
          <Skeleton className="h-9 w-24 rounded mt-auto" />
        </div>
      </div>
    </div>
  );
}

export default function CategoryDetailComponent(): React.JSX.Element {
  const { catId } = useParams({ from: '/dashboard/categories/$catId' });
  const { data: category, isPending } = useQuery(
    categoryByIdQueryOptions(catId)
  );
  const { data: allCategories = [] } = useQuery(allCategoriesQueryOptions);
  const { data: allProducts = [] } = useQuery(allProductsQueryOptions);

  const isEditing = !!useMatch({
    from: '/dashboard/categories/$catId/edit',
    shouldThrow: false,
  });

  const navigate = useNavigate();
  const { mutate: removeCategory } = useRemoveCategory();
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (isPending) {
    return (
      <div className="flex flex-col gap-6">
        <CategoryDetailSkeleton />
      </div>
    );
  }

  if (!category) return <div>Category not found.</div>;

  const parent = category.parentId
    ? allCategories.find((c) => c.id === category.parentId)
    : null;

  const subcategoryIds = allCategories
    .filter((c) => c.parentId === catId)
    .map((c) => c.id);
  const carouselCatIds = new Set([catId, ...subcategoryIds]);
  const products = allProducts.filter((p) => carouselCatIds.has(p.categoryId));

  const specs = [
    `ID: ${category.id}`,
    category.description,
    `Top-level: ${category.isParent ? 'Yes' : 'No'}`,
  ];

  function handleDelete() {
    removeCategory(category!.id, {
      onSuccess: () => navigate({ to: '/dashboard/categories' }),
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
              {category.name}
            </h2>
            <ul className="space-y-2 text-sm list-none text-muted-foreground pt-2">
              {specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
              {parent && (
                <li>
                  Parent:{' '}
                  <Link
                    to="/dashboard/categories/$catId"
                    params={{ catId: parent.id }}
                    className="text-primary hover:underline"
                  >
                    {parent.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Column 2: Actions */}
          <div className="flex flex-col h-full">
            {isEditing ? (
              <Button asChild variant="outline" className="mt-auto w-fit px-8">
                <Link
                  to="/dashboard/categories/$catId"
                  params={{ catId: category.id }}
                >
                  Cancel
                </Link>
              </Button>
            ) : (
              <div className="flex flex-col gap-2 mt-auto">
                <Button asChild className="w-fit px-8">
                  <Link
                    to="/dashboard/categories/$catId/edit"
                    params={{ catId: category.id }}
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
              Products in {category.name}
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
            <AlertDialogTitle>Delete {category.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The category will be permanently
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
