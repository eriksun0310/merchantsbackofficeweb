'use client';

import { useAuthStore } from '@/stores/auth-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-300 bg-white/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 lg:px-8">
        {/* 頁面標題 */}
        <div>
          <h1 className="text-xl font-semibold text-foreground lg:text-2xl">
            {title}
          </h1>
          {description && (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {/* 用戶選單 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 transition-colors hover:bg-muted/50 focus:outline-none">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-neutral-200 text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">管理員</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                帳號設定
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:bg-red-50 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              登出
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
