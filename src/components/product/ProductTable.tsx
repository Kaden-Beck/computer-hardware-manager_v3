// Shadcn Imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
// TanStack Table Imports
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown, Plus } from 'lucide-react';
// TanStack Router Import for Link Element
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import type React from 'react';
import { useMemo, useState } from 'react';

// Types and Data
import type { Product } from '@/schema/Product';
import type { Manufacturer } from '@/schema/Manufacturer';
import type { Category } from '@/schema/Category';
import { allProductsQueryOptions } from '@/lib/queries/products';
import { allManufacturersQueryOptions } from '@/lib/queries/manufacturers';
import { allCategoriesQueryOptions } from '@/lib/queries/categories';
import ProductAddForm from './add/AddBaseProductForm';

// Table Helpers
const columnHelper = createColumnHelper<Product>();

function buildColumns(manufacturers: Manufacturer[], categories: Category[]) {
  return [
    columnHelper.accessor('id', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="h-3 w-3" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="h-3 w-3" />
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          )}
        </button>
      ),
      cell: (info) => (
        <Link
          to="/dashboard/products/$prodId"
          params={{ prodId: info.row.original.id }}
          className="underline hover:text-primary"
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="h-3 w-3" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="h-3 w-3" />
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          )}
        </button>
      ),
      cell: (info) => (
        <Link
          to="/dashboard/products/$prodId"
          params={{ prodId: info.row.original.id }}
          className="underline hover:text-primary"
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('sku', {
      header: 'SKU',
      cell: (info) => (
        <Link
          to="/dashboard/products/$prodId"
          params={{ prodId: info.row.original.id }}
          className="underline hover:text-primary"
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('manufacturerId', {
      header: 'Manufacturer',
      cell: (info) => {
        const manufacturer = manufacturers.find(
          (m) => m.id === info.getValue()
        );
        return (
          <Link
            to="/dashboard/manufacturers/$manId"
            params={{ manId: manufacturer?.id ?? info.getValue() }}
            className="underline hover:text-primary"
          >
            {manufacturer?.name ?? info.getValue()}
          </Link>
        );
      },
    }),
    columnHelper.accessor('categoryId', {
      header: 'Category',
      cell: (info) => {
        const category = categories.find((c) => c.id === info.getValue());
        return (
          <Link
            to="/dashboard/categories/$catId"
            params={{ catId: category?.id ?? info.getValue() }}
            className="underline hover:text-primary"
          >
            {category?.name ?? info.getValue()}
          </Link>
        );
      },
    }),
    columnHelper.accessor('msrp', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          MSRP
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="h-3 w-3" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="h-3 w-3" />
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          )}
        </button>
      ),
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor('quantity', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Qty
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="h-3 w-3" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="h-3 w-3" />
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          )}
        </button>
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <Button variant="outline" size="sm" asChild>
          <Link
            to="/dashboard/products/$prodId/edit"
            params={{ prodId: info.row.original.id }}
          >
            Edit
          </Link>
        </Button>
      ),
    }),
  ];
}

export default function ProductTable(): React.JSX.Element {
  'use no memo';
  const { data: products = [] } = useQuery(allProductsQueryOptions);
  const { data: manufacturers = [] } = useQuery(allManufacturersQueryOptions);
  const { data: categories = [] } = useQuery(allCategoriesQueryOptions);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);

  const columns = useMemo(
    () => buildColumns(manufacturers, categories),
    [manufacturers, categories]
  );

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: { sorting, globalFilter },
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
    },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <Input
          placeholder="Search products..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Add Product</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Product</SheetTitle>
            </SheetHeader>
            <div className="flex-1 min-h-0 overflow-y-auto">
              <ProductAddForm onSuccess={() => setSheetOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-2">
        {table.getRowModel().rows.map((row) => {
          const p = row.original;
          const manufacturer = manufacturers.find(
            (m) => m.id === p.manufacturerId
          );
          const category = categories.find((c) => c.id === p.categoryId);
          return (
            <div
              key={row.id}
              className="rounded-lg border bg-card p-3 flex items-start justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <Link
                  to="/dashboard/products/$prodId"
                  params={{ prodId: p.id }}
                  className="font-medium underline hover:text-primary block truncate"
                >
                  {p.name}
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">
                  SKU: {p.sku}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-sm text-muted-foreground">
                  {manufacturer && (
                    <span>
                      <Link
                        to="/dashboard/manufacturers/$manId"
                        params={{ manId: manufacturer.id }}
                        className="underline hover:text-primary"
                      >
                        {manufacturer.name}
                      </Link>
                    </span>
                  )}
                  {category && (
                    <span>
                      <Link
                        to="/dashboard/categories/$catId"
                        params={{ catId: category.id }}
                        className="underline hover:text-primary"
                      >
                        {category.name}
                      </Link>
                    </span>
                  )}
                </div>
                <div className="flex gap-3 mt-1 text-sm">
                  <span className="font-medium">${p.msrp.toFixed(2)}</span>
                  <span className="text-muted-foreground">
                    Qty: {p.quantity}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild className="shrink-0">
                <Link
                  to="/dashboard/products/$prodId/edit"
                  params={{ prodId: p.id }}
                >
                  Edit
                </Link>
              </Button>
            </div>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              aria-disabled={!table.getCanPreviousPage()}
              className={
                !table.getCanPreviousPage()
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>
          <PaginationItem>
            <span className="px-4 text-sm">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              aria-disabled={!table.getCanNextPage()}
              className={
                !table.getCanNextPage() ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
