import type React from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';
import { productDetails } from '@/data/stub/productData';

// Need to make this dynamic or an option
const PAGE_SIZE = 12;

export function InventoryGallery(): React.JSX.Element {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);

  const filtered = productDetails.filter(
    (product) =>
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.sku.toLowerCase().includes(filter.toLowerCase())
  );

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(0, pageCount - 1));
  const paged = filtered.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFilter(e.target.value);
    setPage(0);
  }

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Search products..."
          value={filter}
          onChange={handleFilterChange}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {paged.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {paged.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
            No products found.
          </p>
        )}
      </div>

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((page) => Math.max(0, page - 1))}
              aria-disabled={currentPage === 0}
              className={cn(
                currentPage === 0 && 'pointer-events-none opacity-50'
              )}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="px-4 text-sm">
              Page {pageCount === 0 ? 0 : currentPage + 1} of {pageCount}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setPage((page) => Math.min(pageCount - 1, page + 1))
              }
              aria-disabled={currentPage >= pageCount - 1}
              className={cn(
                currentPage >= pageCount - 1 && 'pointer-events-none opacity-50'
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
