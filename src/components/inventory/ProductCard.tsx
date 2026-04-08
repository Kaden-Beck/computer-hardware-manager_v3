import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { categoryByIdQueryOptions } from '@/lib/queries/categoryQueries';
import { cn } from '@/lib/utils';

import type { Product } from '@/schema/Product';
import type { Category } from '@/schema/Category';

interface ProductCardProps {
  product: Product;
  category?: Category;
  compact?: boolean;
}

export default function ProductCard({
  product,
  category,
  compact = false,
}: ProductCardProps): React.JSX.Element {
  const { data: fetchedCategory } = useQuery(
    categoryByIdQueryOptions(product.categoryId)
  );
  const [imageLoaded, setImageLoaded] = useState(false);

  const resolvedCategory = category || fetchedCategory;

  const imageSrc =
    product.images?.find((img) => img.isPrimary)?.url ??
    product.images?.[0]?.url ??
    `https://placehold.co/200x200/f3f4f6/6b7280?text=${encodeURIComponent(product.name)}`;

  return (
    <Card className="gap-0 pt-0">
      <Link
        to="/dashboard/products/$prodId"
        params={{ prodId: product.id }}
        className="block"
      >
        <div
          className={cn(
            'relative flex items-center justify-center bg-muted overflow-hidden',
            compact ? 'h-24' : 'aspect-square'
          )}
        >
          {!imageLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
          )}
          <img
            src={imageSrc}
            alt={product.name}
            width={200}
            height={200}
            onLoad={() => setImageLoaded(true)}
            className={cn(
              'object-contain w-full h-full transition-opacity duration-300',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        </div>
      </Link>

      <CardFooter
        className={`flex-col items-start ${compact ? 'gap-1 p-2' : 'gap-3'}`}
      >
        <Link
          to="/dashboard/products/$prodId"
          params={{ prodId: product.id }}
          className="block w-full hover:opacity-80"
        >
          <CardTitle className="truncate text-sm">{product.name}</CardTitle>
          {!compact && (
            <CardDescription className="mt-0.5">
              {resolvedCategory?.name ?? (
                <Skeleton className="h-3 w-20 rounded" />
              )}
            </CardDescription>
          )}
          <p
            className={`font-semibold ${compact ? 'text-xs text-muted-foreground' : 'mt-1 text-sm'}`}
          >
            ${product.msrp.toFixed(2)}
          </p>
        </Link>

        {!compact && (
          <div className="flex w-full gap-2">
            <Button size="sm" className="flex-1" asChild>
              <Link
                to="/dashboard/products/$prodId/edit"
                params={{ prodId: product.id }}
              >
                Edit
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link
                to="/dashboard/products/$prodId"
                params={{ prodId: product.id }}
              >
                View
              </Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
