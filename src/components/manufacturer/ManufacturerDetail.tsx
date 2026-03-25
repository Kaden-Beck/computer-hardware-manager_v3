import type React from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { manufacturerDetails } from '@/data/stub/manufacturerData';
import { productDetails } from '@/data/stub/productData';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCard from '@/components/inventory/ProductCard';
import { cn } from '@/lib/utils';

export default function ManufacturerDetailComponent(): React.JSX.Element | null {
  const { manId } = useParams({ from: '/dashboard/manufacturers/$manId' });
  const manufacturer = manufacturerDetails.find((m) => m.id === manId);

  if (!manufacturer) return <div>Manufacturer not found.</div>;

  const products = productDetails.filter(
    (p) => p.manufacturerId === manId
  );

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
            <Button asChild className="mt-auto w-fit px-8">
              <Link
                to="/dashboard/manufacturers/$manId/edit"
                params={{ manId: manufacturer.id }}
              >
                Edit
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {products.length > 0 && (
        <div className="px-12">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Products by this manufacturer
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
      )}
    </div>
  );
}
