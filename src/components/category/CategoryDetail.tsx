import type React from 'react';
import ProductCard from '@/components/inventory/ProductCard';
// Shadcn/ TW Imports
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
// Tanstack Imports
import { useParams, Link, Outlet, useMatch } from '@tanstack/react-router';
// Stub data imports
import { categoryDetails } from '@/_static_data/stub/categoryData';
import { productDetails } from '@/_static_data/stub/productData';

export default function CategoryDetailComponent(): React.JSX.Element {
  // Get category by params
  const { catId } = useParams({ from: '/dashboard/categories/$catId' });
  const category = categoryDetails.find((c) => c.id === catId);

  // Get editing state using useMatch Hook
  const isEditing = !!useMatch({
    from: '/dashboard/categories/$catId/edit',
    shouldThrow: false,
  });

  // Handle no category found
  if (!category) return <div>Category not found.</div>;

  // Get parent category if there is a parent else null
  const parent = category.parentId
    ? categoryDetails.find((c) => c.id === category.parentId)
    : null;

  // Collect this category's and children ids (for carousel) and create a new Set
  const subcategoryIds = categoryDetails
    .filter((c) => c.parentId === catId)
    .map((c) => c.id);
  const carouselCatIds = new Set([catId, ...subcategoryIds]);
  // (lazy) Get products with ids that exist in Set
  const products = productDetails.filter((p) =>
    carouselCatIds.has(p.categoryId)
  );

  // Format specs into an array
  const specs = [
    `ID: ${category.id}`,
    category.description,
    `Top-level: ${category.isParent ? 'Yes' : 'No'}`,
  ];

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
              <Button asChild className="mt-auto w-fit px-8">
                <Link
                  to="/dashboard/categories/$catId/edit"
                  params={{ catId: category.id }}
                >
                  Edit
                </Link>
              </Button>
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
    </div>
  );
}
