'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ClipboardPaste, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import {
  registerSchema,
  RegisterFormValues,
  ContactMethod,
} from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RegisterSmartPasteDialog } from './register-smart-paste-dialog';

export function RegisterForm() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [smartPasteOpen, setSmartPasteOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      contactName: '',
      contactPhone: '',
      contactMethod: ContactMethod.LINE,
      lineId: '',
    },
  });

  const contactMethod = watch('contactMethod');

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);

    // 模擬 API 請求
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock 註冊成功並登入
    const newUser = {
      id: `u${Date.now()}`,
      email: data.email,
      name: data.contactName,
      createdAt: new Date().toISOString(),
    };

    login(newUser);
    toast.success('註冊成功');
    router.push('/venues');

    setIsLoading(false);
  };

  const handleSmartPasteApply = (data: Partial<RegisterFormValues>) => {
    if (data.email) setValue('email', data.email);
    if (data.password) {
      setValue('password', data.password);
      setValue('confirmPassword', data.password);
    }
    if (data.contactName) setValue('contactName', data.contactName);
    if (data.contactPhone) setValue('contactPhone', data.contactPhone);
    if (data.contactMethod) setValue('contactMethod', data.contactMethod);
    if (data.lineId) setValue('lineId', data.lineId);
    toast.success('已自動填入資料');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">建立帳號</CardTitle>
        <p className="text-sm text-neutral-500">填寫以下資料以建立帳號</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 智慧貼上按鈕 */}
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSmartPasteOpen(true)}
            >
              <ClipboardPaste className="mr-2 h-4 w-4" />
              智慧貼上
            </Button>
          </div>

          {/* 帳號 */}
          <div className="space-y-2">
            <Label htmlFor="email">帳號 (Email)</Label>
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

          {/* 密碼 */}
          <div className="space-y-2">
            <Label htmlFor="password">密碼</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="至少 6 個字元"
                {...register('password')}
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* 確認密碼 */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">確認密碼</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="請再次輸入密碼"
                {...register('confirmPassword')}
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium text-neutral-700 mb-3">負責人資訊</p>
          </div>

          {/* 負責人姓名 */}
          <div className="space-y-2">
            <Label htmlFor="contactName">負責人姓名</Label>
            <Input
              id="contactName"
              type="text"
              placeholder="請輸入負責人姓名"
              {...register('contactName')}
              disabled={isLoading}
            />
            {errors.contactName && (
              <p className="text-sm text-red-500">{errors.contactName.message}</p>
            )}
          </div>

          {/* 電話 */}
          <div className="space-y-2">
            <Label htmlFor="contactPhone">電話</Label>
            <Input
              id="contactPhone"
              type="tel"
              placeholder="0912345678"
              {...register('contactPhone')}
              disabled={isLoading}
            />
            {errors.contactPhone && (
              <p className="text-sm text-red-500">{errors.contactPhone.message}</p>
            )}
          </div>

          {/* 聯絡方式 */}
          <div className="space-y-2">
            <Label>聯絡方式</Label>
            <RadioGroup
              value={contactMethod}
              onValueChange={(value) =>
                setValue('contactMethod', value as ContactMethod)
              }
              className="flex gap-4"
              disabled={isLoading}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={ContactMethod.LINE} id="contact-line" />
                <Label htmlFor="contact-line" className="cursor-pointer">
                  LINE
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={ContactMethod.PHONE} id="contact-phone" />
                <Label htmlFor="contact-phone" className="cursor-pointer">
                  電話
                </Label>
              </div>
            </RadioGroup>
            {errors.contactMethod && (
              <p className="text-sm text-red-500">{errors.contactMethod.message}</p>
            )}
          </div>

          {/* LINE ID (只在選擇 LINE 時顯示) */}
          {contactMethod === ContactMethod.LINE && (
            <div className="space-y-2">
              <Label htmlFor="lineId">LINE ID</Label>
              <Input
                id="lineId"
                type="text"
                placeholder="請輸入 LINE ID"
                {...register('lineId')}
                disabled={isLoading}
              />
              {errors.lineId && (
                <p className="text-sm text-red-500">{errors.lineId.message}</p>
              )}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '註冊中...' : '建立帳號'}
          </Button>

          <p className="text-center text-sm text-neutral-500">
            已經有帳號？{' '}
            <Link href="/login" className="font-medium text-black hover:underline">
              登入
            </Link>
          </p>
        </form>
      </CardContent>

      {/* 智慧貼上 Dialog */}
      <RegisterSmartPasteDialog
        open={smartPasteOpen}
        onOpenChange={setSmartPasteOpen}
        onApply={handleSmartPasteApply}
      />
    </Card>
  );
}
