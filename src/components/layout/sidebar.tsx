'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, Users, ChevronLeft, ChevronRight, LogOut, Settings } from 'lucide-react';
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
    title: '會員管理',
    href: '/members',
    icon: Users,
    disabled: true,
  },
];

const bottomItems = [
  {
    title: '設定',
    href: '/settings',
    icon: Settings,
    disabled: true,
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
          'fixed left-0 top-0 z-40 h-screen border-r border-neutral-200 bg-white transition-all duration-300',
          isOpen ? 'w-60' : 'w-16'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-14 items-center justify-between border-b border-neutral-200 px-4">
            {isOpen && (
              <span className="text-lg font-semibold tracking-tight">PTalk 後台</span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className={cn('h-8 w-8', !isOpen && 'mx-auto')}
            >
              {isOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;

              const linkContent = (
                <Link
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-neutral-100 text-black'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-black',
                    item.disabled && 'pointer-events-none opacity-50'
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
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
          <div className="border-t border-neutral-200 p-2">
            <Separator className="my-2" />

            {bottomItems.map((item) => {
              const Icon = item.icon;

              const linkContent = (
                <Link
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-black',
                    item.disabled && 'pointer-events-none opacity-50'
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
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
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-black"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <span>登出</span>
              </button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-black"
                  >
                    <LogOut className="h-5 w-5 shrink-0" />
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
