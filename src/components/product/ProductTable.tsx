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

import type React from 'react';
import { useState } from 'react';

// Types and Data
import { productDetails } from '@/data/stub/productData';
import { manufacturerDetails } from '@/data/stub/manufacturerData';
import { categoryDetails } from '@/data/stub/categoryData';
import type { Product } from '@/schema/Product';
import ProductAddForm from './ProductAddForm';

// Table Helpers
const columnHelper = createColumnHelper<Product>();

const columns = [
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
      const manufacturer = manufacturerDetails.find(
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
      const category = categoryDetails.find((c) => c.id === info.getValue());
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

export default function ProductTable(): React.JSX.Element {
  'use no memo';
  const [data, setData] = useState<Product[]>(productDetails);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);

  const table = useReactTable({
    data,
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
      <div className="flex items-center justify-between gap-4 mb-4">
        <Input
          placeholder="Search products..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Product
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Product</SheetTitle>
            </SheetHeader>
            <div className="flex-1 min-h-0 overflow-y-auto">
              <ProductAddForm
                onSuccess={() => setSheetOpen(false)}
                onAdd={(item) => setData((prev) => [...prev, item])}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
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
