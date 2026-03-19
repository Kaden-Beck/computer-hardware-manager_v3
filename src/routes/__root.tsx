import { createRootRoute } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import RootComponent from '../components/RootComponent';

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRoute<MyRouterContext>({
  component: RootComponent,
});
