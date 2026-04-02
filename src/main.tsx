import ReactDOM from 'react-dom/client';

import '@/index.css';

// Dev-only: expose seedDatabase on window so you can call it from the browser console
if (import.meta.env.DEV) {
  import('@/db/seed').then(({ seedDatabase }) => {
    (window as Window & { seedDatabase?: typeof seedDatabase }).seedDatabase =
      seedDatabase;
  });
}

// React Router
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
