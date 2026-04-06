import React from 'react';

// Shadcn Imports
import { SearchIcon, BoxIcon, TagIcon, BuildingIcon } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';

// Tanstack Imports
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { allProductsQueryOptions } from '@/lib/queries/productQueries';
import { allCategoriesQueryOptions } from '@/lib/queries/categoryQueries';
import { allManufacturersQueryOptions } from '@/lib/queries/manufacturerQueries';

export function GlobalSearch(): React.JSX.Element {
  // Handle search bar 'open' state
  const [open, setOpen] = React.useState(false);
  // Create a navigation handler
  const navigate = useNavigate();
  // Use React Query to grab stub data
  const { data: products = [] } = useQuery(allProductsQueryOptions);
  const { data: categories = [] } = useQuery(allCategoriesQueryOptions);
  const { data: manufacturers = [] } = useQuery(allManufacturersQueryOptions);

  // Handler for selecting a search result (closes search and navigates to item)
  function handleSelect(url: string): void {
    setOpen(false);
    void navigate({ to: url });
  }

  // Shadcn component with stateful interaction and automapping of react queries results.
  return (
    <SidebarGroup className="py-0">
      <SidebarGroupContent className="relative">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              className="flex h-8 w-full items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground shadow-none hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              onClick={() => setOpen(true)}
            >
              <SearchIcon className="size-4 shrink-0 opacity-50" />
              <span>Search Inventory...</span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-72 p-0"
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Command>
              <CommandInput placeholder="Search inventory..." autoFocus />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Products">
                  {products.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={`${product.name} ${product.sku}`}
                      onSelect={() =>
                        handleSelect(`/dashboard/products/${product.id}`)
                      }
                    >
                      <BoxIcon className="mr-2 size-4 shrink-0 opacity-60" />
                      <span className="flex-1 truncate">{product.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {product.sku}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Categories">
                  {categories.map((category) => (
                    <CommandItem
                      key={category.id}
                      value={category.name}
                      onSelect={() =>
                        handleSelect(`/dashboard/categories/${category.id}`)
                      }
                    >
                      <TagIcon className="mr-2 size-4 shrink-0 opacity-60" />
                      <span>{category.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Manufacturers">
                  {manufacturers.map((manufacturer) => (
                    <CommandItem
                      key={manufacturer.id}
                      value={manufacturer.name}
                      onSelect={() =>
                        handleSelect(
                          `/dashboard/manufacturers/${manufacturer.id}`
                        )
                      }
                    >
                      <BuildingIcon className="mr-2 size-4 shrink-0 opacity-60" />
                      <span>{manufacturer.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
