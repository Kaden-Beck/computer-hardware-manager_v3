import {
  Card,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Package } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { categoryDetails } from '@/data/stub/categoryData';

// Update this when I switch to Zod
import type { Product } from '@/schema/Product';
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
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
        <div className="flex aspect-square items-center justify-center bg-muted">
          <Package className="size-16 text-muted-foreground/40" />
        </div>
      </Link>

      <CardFooter className="flex-col items-start gap-3">
        <Link
          to="/dashboard/products/$prodId"
          params={{ prodId: product.id }}
          className="block w-full hover:opacity-80"
        >
          <CardTitle className="line-clamp-2 leading-snug">
            {product.name}
          </CardTitle>
          <CardDescription className="mt-0.5">
            {category?.name ?? '—'}
          </CardDescription>
          <p className="mt-1 text-sm font-semibold">
            ${product.msrp.toFixed(2)}
          </p>
        </Link>

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
      </CardFooter>
    </Card>
  );
}
