import React from 'react';

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

// Types and Data
import type { Category } from '@/schema/Category';
import { allCategoriesQueryOptions } from '@/lib/queries/categoryQueries';
import CategoryAddForm from './CategoryAddForm';

// Table Helpers
const columnHelper = createColumnHelper<Category>();

function buildColumns(categories: Category[]) {
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
          to="/dashboard/categories/$catId"
          params={{ catId: info.row.original.id }}
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
          to="/dashboard/categories/$catId"
          params={{ catId: info.row.original.id }}
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
    columnHelper.accessor('isParent', {
      header: 'Parent',
      cell: (info) => (info.getValue() ? 'Yes' : 'No'),
    }),
    columnHelper.accessor('parentId', {
      header: 'Parent Category',
      cell: (info) => {
        const parentId = info.getValue();
        if (!parentId) return '—';
        const parent = categories.find((c) => c.id === parentId);
        return (
          <Link
            to="/dashboard/categories/$catId"
            params={{ catId: parentId }}
            className="underline hover:text-primary"
          >
            {parent?.name ?? 'orphan'}
          </Link>
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <Button variant="outline" size="sm" asChild>
          <Link
            to="/dashboard/categories/$catId/edit"
            params={{ catId: info.row.original.id }}
          >
            Edit
          </Link>
        </Button>
      ),
    }),
  ];
}

export default function CategoryTable(): React.JSX.Element {
  'use no memo';
  const { data = [] } = useQuery(allCategoriesQueryOptions);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const columns = React.useMemo(() => buildColumns(data), [data]);

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
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <Input
          placeholder="Search categories..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Add Category</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Category</SheetTitle>
            </SheetHeader>
            <CategoryAddForm onSuccess={() => setSheetOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-2">
        {table.getRowModel().rows.map((row) => {
          const c = row.original;
          const parent = c.parentId
            ? data.find((cat) => cat.id === c.parentId)
            : null;
          return (
            <div
              key={row.id}
              className="rounded-lg border bg-card p-3 flex items-start justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    to="/dashboard/categories/$catId"
                    params={{ catId: c.id }}
                    className="font-medium underline hover:text-primary truncate"
                  >
                    {c.name}
                  </Link>
                  {c.isParent && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground shrink-0">
                      Parent
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                  {c.description}
                </p>
                {parent && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Under:{' '}
                    <Link
                      to="/dashboard/categories/$catId"
                      params={{ catId: parent.id }}
                      className="underline hover:text-primary"
                    >
                      {parent.name}
                    </Link>
                  </p>
                )}
              </div>
              <Button variant="outline" size="sm" asChild className="shrink-0">
                <Link
                  to="/dashboard/categories/$catId/edit"
                  params={{ catId: c.id }}
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
