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
// Tanstack Imports
import { useParams, Link, Outlet, useMatch } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
// Stub Data
import { manufacturerDetails } from '@/_static_data/stub/manufacturerData';
import { productDetails } from '@/_static_data/stub/productData';

export default function ManufacturerDetailComponent(): React.JSX.Element {
  // Get manufacturer by ID passed in params
  const { manId } = useParams({ from: '/dashboard/manufacturers/$manId' });
  const manufacturer = manufacturerDetails.find((m) => m.id === manId);

  // Get editing state using React Router useMatch Hook
  const isEditing = !!useMatch({
    from: '/dashboard/manufacturers/$manId/edit',
    shouldThrow: false,
  });

  // Catch if no manufacturer at route
  if (!manufacturer) return <div>Manufacturer not found.</div>;

  // Get products produced by manufacturer for carousel
  const products = productDetails.filter((p) => p.manufacturerId === manId);
  const specs = [`ID: ${manufacturer.id}`, manufacturer.description];

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
              <Button asChild className="mt-auto w-fit px-8">
                <Link
                  to="/dashboard/manufacturers/$manId/edit"
                  params={{ manId: manufacturer.id }}
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
    </div>
  );
}
