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
