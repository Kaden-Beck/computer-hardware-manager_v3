import type React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { GalleryVerticalEnd } from 'lucide-react';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/hooks/useAuth';

export default function App(): React.JSX.Element | null {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: '/dashboard/inventory' });
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Kaden's Computer Repair
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
