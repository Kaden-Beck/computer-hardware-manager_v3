import UsersPage from '@/components/user/Users';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/users/')({
  component: UsersPage,
});
