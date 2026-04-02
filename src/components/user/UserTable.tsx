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
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Types and Data
import type { AppUser } from '@/schema/AppUser';
import { allUsersQueryOptions } from '@/lib/queries/user';
import { cn } from '@/lib/utils';

function UserAvatar({ user }: { user: AppUser }): React.JSX.Element {
  const initials = user.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-2">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
        {initials}
      </span>
      <span className="font-medium">{user.displayName}</span>
      {user.isCurrentUser && (
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          You
        </span>
      )}
    </div>
  );
}

function StatusBadge({ revoked }: { revoked: boolean }): React.JSX.Element {
  return (
    <span
      className={cn(
        'rounded-full px-2 py-0.5 text-xs font-medium',
        revoked
          ? 'bg-destructive/10 text-destructive'
          : 'bg-green-500/10 text-green-600 dark:text-green-400'
      )}
    >
      {revoked ? 'Revoked' : 'Active'}
    </span>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const columnHelper = createColumnHelper<AppUser>();

function buildColumns(
  onRevoke: (user: AppUser) => void,
  onRestore: (user: AppUser) => void
) {
  return [
    columnHelper.display({
      id: 'displayName',
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
      cell: (info) => <UserAvatar user={info.row.original} />,
    }),
    columnHelper.accessor('email', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
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
        <span className="text-muted-foreground">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('provider', {
      header: 'Provider',
      cell: (info) => (
        <span className="capitalize">
          {info.getValue() === 'google.com' ? 'Google' : 'Email/Password'}
        </span>
      ),
    }),
    columnHelper.accessor('lastSignIn', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Last Sign-In
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="h-3 w-3" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="h-3 w-3" />
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          )}
        </button>
      ),
      cell: (info) => formatDate(info.getValue()),
      sortingFn: 'datetime',
    }),
    columnHelper.accessor('createdAt', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Joined
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="h-3 w-3" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="h-3 w-3" />
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          )}
        </button>
      ),
      cell: (info) => formatDate(info.getValue()),
      sortingFn: 'datetime',
    }),
    columnHelper.accessor('revoked', {
      header: 'Status',
      cell: (info) => <StatusBadge revoked={info.getValue()} />,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => {
        const user = info.row.original;
        if (user.isCurrentUser) return null;
        return user.revoked ? (
          <Button variant="outline" size="sm" onClick={() => onRestore(user)}>
            Restore
          </Button>
        ) : (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onRevoke(user)}
          >
            Revoke
          </Button>
        );
      },
    }),
  ];
}

export default function UserTable(): React.JSX.Element {
  'use no memo';
  const { data = [] } = useQuery(allUsersQueryOptions);
  const queryClient = useQueryClient();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [pendingUser, setPendingUser] = React.useState<AppUser | null>(null);
  const [dialogAction, setDialogAction] = React.useState<'revoke' | 'restore'>(
    'revoke'
  );

  function handleRevoke(user: AppUser): void {
    setPendingUser(user);
    setDialogAction('revoke');
  }

  function handleRestore(user: AppUser): void {
    setPendingUser(user);
    setDialogAction('restore');
  }

  function handleConfirm(): void {
    if (!pendingUser) return;
    queryClient.setQueryData(
      allUsersQueryOptions.queryKey,
      (old: AppUser[] = []) =>
        old.map((u) =>
          u.uuid === pendingUser.uuid
            ? { ...u, revoked: dialogAction === 'revoke' }
            : u
        )
    );
    setPendingUser(null);
  }

  const columns = buildColumns(handleRevoke, handleRestore);

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
          placeholder="Search users..."
          value={globalFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGlobalFilter(e.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-2">
        {table.getRowModel().rows.map((row) => {
          const user = row.original;
          return (
            <div
              key={row.id}
              className={cn(
                'rounded-lg border bg-card p-3 flex items-start justify-between gap-3',
                user.revoked && 'opacity-60'
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <UserAvatar user={user} />
                  <StatusBadge revoked={user.revoked} />
                </div>
                <p className="text-sm text-muted-foreground mt-1 truncate">
                  {user.email}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                  <span className="capitalize">
                    {user.provider === 'google.com'
                      ? 'Google'
                      : 'Email/Password'}
                  </span>
                  <span>Last sign-in: {formatDate(user.lastSignIn)}</span>
                </div>
              </div>
              {!user.isCurrentUser && (
                <div className="shrink-0">
                  {user.revoked ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRestore(user)}
                    >
                      Restore
                    </Button>
                  ) : (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRevoke(user)}
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              )}
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
              <TableRow
                key={row.id}
                className={row.original.revoked ? 'opacity-60' : ''}
              >
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

      <AlertDialog
        open={!!pendingUser}
        onOpenChange={(open) => {
          if (!open) setPendingUser(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogAction === 'revoke' ? 'Revoke Access' : 'Restore Access'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogAction === 'revoke'
                ? `Are you sure you want to revoke access for ${pendingUser?.displayName} (${pendingUser?.email})? They will no longer be able to sign in.`
                : `Restore access for ${pendingUser?.displayName} (${pendingUser?.email})? They will be able to sign in again.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={
                dialogAction === 'revoke'
                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  : ''
              }
            >
              {dialogAction === 'revoke' ? 'Revoke' : 'Restore'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
