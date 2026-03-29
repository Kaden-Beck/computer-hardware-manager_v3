import {
  Card,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { categoryDetails } from '@/_static_data/stub/categoryData';

// Update this when I switch to Zod
import type { Product } from '@/schema/Product';
interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({
  product,
  compact = false,
}: ProductCardProps): React.JSX.Element {
  // Find category in details array by id+
  const category = categoryDetails.find((c) => c.id === product.categoryId);

  // Build a shadcn based card with placeholder image
  return (
    <Card className="gap-0 pt-0">
      <Link
        to="/dashboard/products/$prodId"
        params={{ prodId: product.id }}
        className="block"
      >
        <div
          className={`flex items-center justify-center bg-muted overflow-hidden ${compact ? 'h-24' : 'aspect-square'}`}
        >
          <img
            src={`https://placehold.co/200x200/f3f4f6/6b7280?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain w-full h-full"
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
              {category?.name ?? '—'}
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
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link
                to="/dashboard/products/$prodId"
                params={{ prodId: product.id }}
              >
                View
              </Link>
            </Button>
            <Button size="sm" className="flex-1" asChild>
              <Link
                to="/dashboard/products/$prodId/edit"
                params={{ prodId: product.id }}
              >
                Edit
              </Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
