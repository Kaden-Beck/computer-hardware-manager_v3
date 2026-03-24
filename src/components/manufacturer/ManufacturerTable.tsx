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
import { manufacturerDetails } from '@/data/stub/manufacturerData';
import type { Manufacturer } from '@/schema/Manufacturer';

// Table Helpers
const columnHelper = createColumnHelper<Manufacturer>();

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
        to="/dashboard/manufacturers/$manId"
        params={{ manId: info.row.original.id }}
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
        to="/dashboard/manufacturers/$manId"
        params={{ manId: info.row.original.id }}
        className="underline hover:text-primary"
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: (info) => (
      <Button variant="outline" size="sm" asChild>
        <Link
          to="/dashboard/manufacturers/$manId/edit"
          params={{ manId: info.row.original.id }}
        >
          Edit
        </Link>
      </Button>
    ),
  }),
];

export default function ManufacturerTable(): React.JSX.Element {
  'use no memo';
  const [data, setData] = useState<Manufacturer[]>(manufacturerDetails);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

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
    if (!newName.trim()) return;
    setConfirmOpen(true);
  }

  function handleConfirm() {
    const newManufacturer: Manufacturer = {
      id: Math.random().toString(16).slice(2, 10),
      name: newName.trim(),
      description: newDescription.trim(),
    };
    setData((prev) => [...prev, newManufacturer]);
    setNewName('');
    setNewDescription('');
    setConfirmOpen(false);
    setSheetOpen(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Input
          placeholder="Search manufacturers..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Manufacturer
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Manufacturer</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6 px-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Corsair"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="e.g. Produces RAM, PSUs, and peripherals."
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
              <AlertDialogTitle>Confirm New Manufacturer</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Name:</span> {newName.trim()}
                  </p>
                  {newDescription.trim() && (
                    <p>
                      <span className="font-medium">Description:</span>{' '}
                      {newDescription.trim()}
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
