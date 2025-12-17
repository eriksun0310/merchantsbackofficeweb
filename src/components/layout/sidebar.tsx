'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, ChevronLeft, ChevronRight, LogOut, Settings, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores/sidebar-store';
import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  {
    title: '店家管理',
    href: '/venues',
    icon: Store,
  },
  {
    title: '評論管理',
    href: '/comments',
    icon: MessageSquare,
  },
];

const bottomItems = [
  {
    title: '設定',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebarStore();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-brand-light text-brand-dark transition-all duration-300',
          isOpen ? 'w-60' : 'w-16'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-3">
            <button
              onClick={!isOpen ? toggle : undefined}
              className={cn('flex items-center gap-2', !isOpen && 'mx-auto cursor-pointer')}
            >
              <img
                src="/images/logo.png"
                alt="PTalk Logo"
                width={40}
                height={40}
                className="rounded-xl shadow-lg"
              />
              {isOpen && (
                <span className="text-lg font-bold tracking-tight text-brand-dark">PTalk</span>
              )}
            </button>
            {isOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggle}
                className="h-8 w-8 text-brand hover:text-brand-dark hover:bg-brand/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;

              const linkContent = (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand text-white'
                      : 'text-brand hover:bg-brand/20 hover:text-brand-dark'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {isOpen && <span>{item.title}</span>}
                </Link>
              );

              if (!isOpen) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return <div key={item.href}>{linkContent}</div>;
            })}
          </nav>

          {/* Bottom section */}
          <div className="p-2 mt-auto">
            {/* <Separator className="my-2" /> */}

            {bottomItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              const linkContent = (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand text-white'
                      : 'text-brand hover:bg-brand/20 hover:text-brand-dark'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {isOpen && <span>{item.title}</span>}
                </Link>
              );

              if (!isOpen) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return <div key={item.href}>{linkContent}</div>;
            })}

            {/* Logout */}
            {isOpen ? (
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand/20 hover:text-brand-dark"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>登出</span>
              </button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand/20 hover:text-brand-dark"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>登出</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
