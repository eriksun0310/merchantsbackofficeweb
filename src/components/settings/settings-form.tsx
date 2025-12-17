'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import {
  settingsSchema,
  SettingsFormValues,
  ContactMethod,
} from '@/lib/validations/settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock 當前用戶資料
  const currentUser = {
    email: 'user@example.com',
    contactName: '林先生',
    contactPhone: '0912345678',
    contactMethod: ContactMethod.LINE,
    lineId: 'a0912345678',
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      email: currentUser.email,
      password: '',
      confirmPassword: '',
      contactName: currentUser.contactName,
      contactPhone: currentUser.contactPhone,
      contactMethod: currentUser.contactMethod,
      lineId: currentUser.lineId,
    },
  });

  const contactMethod = watch('contactMethod');
  const password = watch('password');

  const onSubmit = async (data: SettingsFormValues) => {
    setIsLoading(true);

    // 模擬 API 請求
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('更新資料:', data);
    toast.success('設定已儲存');

    setIsLoading(false);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-base font-medium mb-6">個人資訊</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
          {/* 左側：帳號與密碼 */}
          <div className="space-y-6">
            {/* 帳號（唯讀） */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">帳號 (Email)</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                disabled
              />
              <p className="text-xs text-muted-foreground/70">帳號無法變更</p>
            </div>

            <div className="pt-2">
              <p className="text-sm font-medium text-foreground mb-4">
                變更密碼（選填）
              </p>
            </div>

            {/* 新密碼 */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-muted-foreground">新密碼</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="如不變更請留空"
                  {...register('password')}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* 確認新密碼 */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm text-muted-foreground">確認新密碼</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="請再次輸入新密碼"
                  {...register('confirmPassword')}
                  disabled={isLoading || !password}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
                <p className="text-xs text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* 右側：負責人資訊 */}
          <div className="space-y-6">
            <p className="text-sm font-medium text-foreground">負責人資訊</p>

            {/* 負責人姓名 */}
            <div className="space-y-2">
              <Label htmlFor="contactName" className="text-sm text-muted-foreground">負責人姓名</Label>
              <Input
                id="contactName"
                type="text"
                placeholder="請輸入負責人姓名"
                {...register('contactName')}
                disabled={isLoading}
              />
              {errors.contactName && (
                <p className="text-xs text-destructive">{errors.contactName.message}</p>
              )}
            </div>

            {/* 電話 */}
            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="text-sm text-muted-foreground">電話</Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="0912345678"
                {...register('contactPhone')}
                disabled={isLoading}
              />
              {errors.contactPhone && (
                <p className="text-xs text-destructive">{errors.contactPhone.message}</p>
              )}
            </div>

            {/* 聯絡方式 */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">聯絡方式</Label>
              <RadioGroup
                value={contactMethod}
                onValueChange={(value) =>
                  setValue('contactMethod', value as ContactMethod, {
                    shouldDirty: true,
                  })
                }
                className="flex gap-4"
                disabled={isLoading}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={ContactMethod.LINE} id="contact-line" />
                  <Label htmlFor="contact-line" className="cursor-pointer text-sm">
                    LINE
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={ContactMethod.PHONE} id="contact-phone" />
                  <Label htmlFor="contact-phone" className="cursor-pointer text-sm">
                    電話
                  </Label>
                </div>
              </RadioGroup>
              {errors.contactMethod && (
                <p className="text-xs text-destructive">{errors.contactMethod.message}</p>
              )}
            </div>

            {/* LINE ID (只在選擇 LINE 時顯示) */}
            {contactMethod === ContactMethod.LINE && (
              <div className="space-y-2">
                <Label htmlFor="lineId" className="text-sm text-muted-foreground">LINE ID</Label>
                <Input
                  id="lineId"
                  type="text"
                  placeholder="請輸入 LINE ID"
                  {...register('lineId')}
                  disabled={isLoading}
                />
                {errors.lineId && (
                  <p className="text-xs text-destructive">{errors.lineId.message}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 儲存按鈕 */}
        <div className="flex justify-end mt-8">
          <Button type="submit" disabled={isLoading || !isDirty}>
            {isLoading ? '儲存中...' : '儲存變更'}
          </Button>
        </div>
      </form>
    </div>
  );
}
