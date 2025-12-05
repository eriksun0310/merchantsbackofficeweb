'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth-store';
import { mockUser, mockCredentials } from '@/mock/user';
import { loginSchema, LoginFormValues } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'demo@ptalk.com',
      password: 'demo1234',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    // 模擬 API 請求
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock 驗證
    if (
      data.email === mockCredentials.email &&
      data.password === mockCredentials.password
    ) {
      login(mockUser);
      toast.success('登入成功');
      router.push('/venues');
    } else {
      toast.error('Email 或密碼錯誤');
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">PTalk 店家後台</CardTitle>
        <p className="text-sm text-neutral-500">請登入您的帳號</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              {...register('email')}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">密碼</Label>
            <Input
              id="password"
              type="password"
              placeholder="請輸入密碼"
              {...register('password')}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '登入中...' : '登入'}
          </Button>

          <p className="text-center text-sm text-neutral-500">
            還沒有帳號？{' '}
            <Link href="/register" className="font-medium text-black hover:underline">
              立即註冊
            </Link>
          </p>
        </form>

        {/* Demo 提示 */}
        <div className="mt-6 rounded-md bg-neutral-100 p-3 text-sm text-neutral-600">
          <p className="font-medium">Demo 帳號</p>
          <p>Email: demo@ptalk.com</p>
          <p>密碼: demo1234</p>
        </div>
      </CardContent>
    </Card>
  );
}
