'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { useSidebarStore } from '@/stores/sidebar-store';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();
  const { isOpen } = useSidebarStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <main
        className={cn(
          'min-h-screen transition-all duration-300',
          isOpen ? 'ml-60' : 'ml-16'
        )}
      >
        {children}
      </main>
    </div>
  );
}
