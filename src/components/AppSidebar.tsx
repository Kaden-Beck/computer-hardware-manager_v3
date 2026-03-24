import React from 'react';

import { GlobalSearch } from '@/components/GlobalSearch';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

interface SidebarData {
  title: string;
  url: string;
  items: Array<{ title: string; url: string }>;
}

import { sidebarData } from '@/data/sidebarCategories';
import { Link } from '@tanstack/react-router';
import { GalleryVerticalEnd } from 'lucide-react';

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>): React.JSX.Element {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <GalleryVerticalEnd className="size-4" />
          Kaden's Computer Repair
        </div>
        <GlobalSearch />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {sidebarData.navMain.map((sbGroup: SidebarData) => (
          <SidebarGroup key={sbGroup.title}>
            <SidebarGroupLabel>{sbGroup.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sbGroup.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
