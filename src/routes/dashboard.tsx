import { createFileRoute, redirect } from '@tanstack/react-router';
import DashboardComponent from '../components/Dashboard';
import { auth } from '@/lib/firebase';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    if (!auth.currentUser) {
      throw redirect({ to: '/' });
    }
  },
  component: DashboardComponent,
});
