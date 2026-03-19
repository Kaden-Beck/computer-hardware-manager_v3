import { AppSidebar } from './AppSidebar';
import { Link, Outlet, useRouterState } from '@tanstack/react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { manufacturerDetails } from '@/data/stub/manufacturerData';
import { productDetails } from '@/data/stub/productData';
import { categoryDetails } from '@/data/stub/categoryData';

type Crumb = {
  label: string;
  href?: string; // resolved path — omitted for the current (last) page
};

const SECTIONS: Record<string, { label: string; href: string }> = {
  manufacturers: { label: 'Manufacturers', href: '/dashboard/manufacturers' },
  products:      { label: 'Products',       href: '/dashboard/products' },
  categories:    { label: 'Categories',     href: '/dashboard/categories' },
  inventory:     { label: 'Inventory',      href: '/dashboard/inventory' },
};

function buildCrumbs(pathname: string): Crumb[] {
  const segments = pathname.replace(/^\/dashboard\/?/, '').split('/').filter(Boolean);
  if (!segments.length) return [{ label: 'Dashboard' }];

  const [section, id, action] = segments;
  const sectionInfo = SECTIONS[section];
  if (!sectionInfo) return [{ label: section }];

  // Single-level: /dashboard/manufacturers
  if (!id) return [{ label: sectionInfo.label }];

  // Build section crumb (always a link since we're deeper)
  const crumbs: Crumb[] = [{ label: sectionInfo.label, href: sectionInfo.href }];

  // Resolve entity name from stub data
  let entityName = id;
  const entityHref = `${sectionInfo.href}/${id}`;

  if (section === 'manufacturers') {
    entityName = manufacturerDetails.find((m) => m.id === id)?.name ?? id;
  } else if (section === 'products') {
    entityName = productDetails.find((p) => p.id === id)?.name ?? id;
  } else if (section === 'categories') {
    entityName = categoryDetails.find((c) => c.id === id)?.name ?? id;
  }

  // Detail page: /dashboard/manufacturers/$id
  if (!action) {
    crumbs.push({ label: entityName });
    return crumbs;
  }

  // Edit page: /dashboard/manufacturers/$id/edit
  crumbs.push({ label: entityName, href: entityHref });
  crumbs.push({ label: 'Edit' });
  return crumbs;
}

export default function DashboardComponent() {
  const { location } = useRouterState();
  const crumbs = buildCrumbs(location.pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {crumbs.map((crumb, i) => {
                const isLast = i === crumbs.length - 1;
                return (
                  <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {isLast || !crumb.href ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={crumb.href}>{crumb.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </span>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
