'use client';

import { useAuthStore } from '@/stores/auth-store';
import { useMerchantProfile } from '@/hooks/use-merchant';
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
  const { logout } = useAuthStore();
  const { data: profile } = useMerchantProfile();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const displayName = profile?.contactName || profile?.companyName || '使用者';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-10 bg-brand-light shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 lg:px-8">
        {/* 頁面標題 */}
        <div>
          <h1 className="text-xl font-semibold text-brand-dark lg:text-2xl">
            {title}
          </h1>
          {description && (
            <p className="mt-0.5 text-sm text-brand">{description}</p>
          )}
        </div>

        {/* 用戶選單 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 transition-colors hover:bg-brand/20 focus:outline-none">
              <Avatar className="h-9 w-9">
                <AvatarImage src={undefined} alt={displayName} />
                <AvatarFallback className="bg-brand-dark text-sm font-medium text-brand-light">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium text-brand-dark">{displayName}</p>
                <p className="text-xs text-brand">{profile?.companyName}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-brand" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{profile?.email}</p>
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
