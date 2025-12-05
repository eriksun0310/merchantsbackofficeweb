import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '請輸入 Email')
    .email('Email 格式不正確'),
  password: z
    .string()
    .min(1, '請輸入密碼')
    .min(6, '密碼至少 6 個字元'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, '請輸入姓名')
      .max(50, '姓名不可超過 50 字'),
    email: z
      .string()
      .min(1, '請輸入 Email')
      .email('Email 格式不正確'),
    password: z
      .string()
      .min(1, '請輸入密碼')
      .min(6, '密碼至少 6 個字元'),
    confirmPassword: z
      .string()
      .min(1, '請確認密碼'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '密碼不一致',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
