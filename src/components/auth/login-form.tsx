'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    <Card className="w-full max-w-sm border-0">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-xl font-medium">PTalk 店家後台</CardTitle>
        <p className="text-sm text-muted-foreground">請登入您的帳號</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-muted-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              {...register('email')}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-muted-foreground">密碼</Label>
            <Input
              id="password"
              type="password"
              placeholder="請輸入密碼"
              {...register('password')}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '登入中...' : '登入'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
