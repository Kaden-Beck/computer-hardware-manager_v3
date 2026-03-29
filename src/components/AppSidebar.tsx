import React from 'react';

import { GlobalSearch } from '@/components/GlobalSearch';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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

import { sidebarData } from '@/_static_data/sidebarCategories';
import { signInWithGoogle, signOutUser } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from '@tanstack/react-router';
import { LogInIcon, LogOutIcon, GpuIcon } from 'lucide-react';

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>): React.JSX.Element {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut(): Promise<void> {
    await signOutUser();
    void navigate({ to: '/' });
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <GpuIcon className="size-4" />
          Kaden's Computer Repair
        </div>
        <GlobalSearch />
      </SidebarHeader>
      <SidebarContent>
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {!loading &&
              (user ? (
                <SidebarMenuButton
                  onClick={() => void handleSignOut()}
                  className="w-full"
                >
                  <LogOutIcon className="size-4" />
                  <span>Sign Out</span>
                  {user.displayName && (
                    <span className="ml-auto truncate text-xs text-muted-foreground">
                      {user.displayName}
                    </span>
                  )}
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton
                  onClick={() => void signInWithGoogle()}
                  className="w-full"
                >
                  <LogInIcon className="size-4" />
                  <span>Sign In with Google</span>
                </SidebarMenuButton>
              ))}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
