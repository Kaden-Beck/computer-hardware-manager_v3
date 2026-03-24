// Shadcn Imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newManufacturerId, setNewManufacturerId] = useState('');
  const [newCategoryId, setNewCategoryId] = useState('');
  const [newMsrp, setNewMsrp] = useState('');
  const [newQuantity, setNewQuantity] = useState('');

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

  function handleSaveClick() {
    if (!newName.trim() || !newSku.trim()) return;
    setConfirmOpen(true);
  }

  function handleConfirm() {
    const newProduct: Product = {
      id: `prod${Math.random().toString(16).slice(2, 10)}`,
      name: newName.trim(),
      sku: newSku.trim(),
      description: newDescription.trim(),
      manufacturerId: newManufacturerId,
      categoryId: newCategoryId,
      msrp: parseFloat(newMsrp) || 0,
      quantity: parseInt(newQuantity, 10) || 0,
    };
    setData((prev) => [...prev, newProduct]);
    setNewName('');
    setNewSku('');
    setNewDescription('');
    setNewManufacturerId('');
    setNewCategoryId('');
    setNewMsrp('');
    setNewQuantity('');
    setConfirmOpen(false);
    setSheetOpen(false);
  }

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
            <div className="flex flex-col gap-4 mt-6 px-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. GeForce RTX 5090"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={newSku}
                  onChange={(e) => setNewSku(e.target.value)}
                  placeholder="e.g. NV-RTX5090"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="e.g. Flagship GPU with 32GB GDDR7."
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="manufacturerId">Manufacturer</Label>
                <select
                  id="manufacturerId"
                  value={newManufacturerId}
                  onChange={(e) => setNewManufacturerId(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                >
                  <option value="">Select a manufacturer...</option>
                  {manufacturerDetails.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="categoryId">Category</Label>
                <select
                  id="categoryId"
                  value={newCategoryId}
                  onChange={(e) => setNewCategoryId(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                >
                  <option value="">Select a category...</option>
                  {categoryDetails.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="msrp">MSRP ($)</Label>
                <Input
                  id="msrp"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newMsrp}
                  onChange={(e) => setNewMsrp(e.target.value)}
                  placeholder="e.g. 1999.99"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  step="1"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>
              <Button onClick={handleSaveClick} className="mt-2">
                Save
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm New Product</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Name:</span> {newName.trim()}
                  </p>
                  <p>
                    <span className="font-medium">SKU:</span> {newSku.trim()}
                  </p>
                  {newDescription.trim() && (
                    <p>
                      <span className="font-medium">Description:</span>{' '}
                      {newDescription.trim()}
                    </p>
                  )}
                  {newManufacturerId && (
                    <p>
                      <span className="font-medium">Manufacturer:</span>{' '}
                      {manufacturerDetails.find(
                        (m) => m.id === newManufacturerId
                      )?.name ?? newManufacturerId}
                    </p>
                  )}
                  {newCategoryId && (
                    <p>
                      <span className="font-medium">Category:</span>{' '}
                      {categoryDetails.find((c) => c.id === newCategoryId)
                        ?.name ?? newCategoryId}
                    </p>
                  )}
                  {newMsrp && (
                    <p>
                      <span className="font-medium">MSRP:</span> $
                      {parseFloat(newMsrp).toFixed(2)}
                    </p>
                  )}
                  {newQuantity && (
                    <p>
                      <span className="font-medium">Quantity:</span>{' '}
                      {newQuantity}
                    </p>
                  )}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
