import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';
// Shadcn/ TW
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
// Queries
import { allProductsQueryOptions } from '@/lib/queries/productQueries';
import { allCategoriesQueryOptions } from '@/lib/queries/categoryQueries';
import { allManufacturersQueryOptions } from '@/lib/queries/manufacturerQueries';

// Need to make this dynamic or an option
const PAGE_SIZE = 12;

export function InventoryGallery(): React.JSX.Element {
  /***************
   * useQuery Hooks
   ****************/
  const { data: products = [] } = useQuery(allProductsQueryOptions);
  const { data: categories = [] } = useQuery(allCategoriesQueryOptions);
  const { data: manufacturers = [] } = useQuery(allManufacturersQueryOptions);

  /***************
   * useState Hooks
   ****************/
  const [filter, setFilter] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedManufacturer, setSelectedManufacturer] = React.useState('all');
  const [stockStatus, setStockStatus] = React.useState<
    'all' | 'instock' | 'outofstock'
  >('all');

  // (lazy)
  // Get unique categories and manufacturers from products
  const uniqueCategories = Array.from(
    new Set(products.map((p) => p.categoryId))
  )
    .map((catId) => categories.find((c) => c.id === catId))
    .filter((cat) => cat !== undefined)
    .sort((a, b) => a!.name.localeCompare(b!.name));

  const uniqueManufacturers = Array.from(
    new Set(products.map((p) => p.manufacturerId))
  )
    .map((mfgId) => manufacturers.find((m) => m.id === mfgId))
    .filter((mfg) => mfg !== undefined)
    .sort((a, b) => a!.name.localeCompare(b!.name));

  // (lazy)
  // Returned a list of filtered products based on user filter
  const filtered = products.filter((product) => {
    // Filter (text)
    const textMatches: boolean =
      !filter ||
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.sku.toLowerCase().includes(filter.toLowerCase());
    // Filer (category)
    const matchesCategory: boolean =
      selectedCategory === 'all' || product.categoryId === selectedCategory;
    // Filter (manufacturer)
    const matchesManufacturer: boolean =
      selectedManufacturer === 'all' ||
      product.manufacturerId === selectedManufacturer;
    // Filter (stock)
    const matchesStock: boolean =
      stockStatus === 'all' ||
      (stockStatus === 'instock' && product.quantity > 0) ||
      (stockStatus === 'outofstock' && product.quantity === 0);
    // Return filtered results
    return (
      textMatches && matchesCategory && matchesManufacturer && matchesStock
    );
  });

  /* *********
   * Pagination
   * **********/
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(0, pageCount - 1));
  const paged = filtered.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  /* ***************
   * Handle Filters
   * ***************/
  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFilter(e.target.value);
    setPage(0);
  }

  function handleCategoryChange(value: string): void {
    setSelectedCategory(value);
    setPage(0);
  }

  function handleManufacturerChange(value: string): void {
    setSelectedManufacturer(value);
    setPage(0);
  }

  function handleStockStatusChange(value: string): void {
    setStockStatus(value as 'all' | 'instock' | 'outofstock');
    setPage(0);
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search products..."
          value={filter}
          onChange={handleFilterChange}
          className="max-w-sm shrink-0"
        />

        <div className="flex flex-col gap-3 sm:flex-row">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-45">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category!.id} value={category!.id}>
                  {category!.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedManufacturer}
            onValueChange={handleManufacturerChange}
          >
            <SelectTrigger className="w-full sm:w-45">
              <SelectValue placeholder="Manufacturer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Manufacturers</SelectItem>
              {uniqueManufacturers.map((manufacturer) => (
                <SelectItem key={manufacturer!.id} value={manufacturer!.id}>
                  {manufacturer!.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={stockStatus} onValueChange={handleStockStatusChange}>
            <SelectTrigger className="w-full sm:w-45">
              <SelectValue placeholder="Stock Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock</SelectItem>
              <SelectItem value="instock">In Stock</SelectItem>
              <SelectItem value="outofstock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {paged.map((product) => {
          const category = categories.find((c) => c.id === product.categoryId);
          return (
            <ProductCard
              key={product.id}
              product={product}
              category={category}
            />
          );
        })}
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
