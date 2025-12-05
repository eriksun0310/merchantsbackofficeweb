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

/** 聯絡方式 */
export enum ContactMethod {
  LINE = 'line',
  PHONE = 'phone',
}

export const registerSchema = z
  .object({
    // 帳號密碼
    email: z
      .string()
      .min(1, '請輸入帳號 (Email)')
      .email('Email 格式不正確'),
    password: z
      .string()
      .min(1, '請輸入密碼')
      .min(6, '密碼至少 6 個字元'),
    confirmPassword: z
      .string()
      .min(1, '請確認密碼'),
    // 負責人資訊
    contactName: z
      .string()
      .min(1, '請輸入負責人姓名')
      .max(50, '姓名不可超過 50 字'),
    contactPhone: z
      .string()
      .min(1, '請輸入電話')
      .regex(/^09\d{8}$/, '請輸入有效的手機號碼'),
    // 聯絡方式
    contactMethod: z.nativeEnum(ContactMethod, {
      message: '請選擇聯絡方式',
    }),
    lineId: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '密碼不一致',
    path: ['confirmPassword'],
  })
  .refine(
    (data) => {
      // 如果選擇 LINE，則 lineId 為必填
      if (data.contactMethod === ContactMethod.LINE) {
        return !!data.lineId && data.lineId.trim().length > 0;
      }
      return true;
    },
    {
      message: '請輸入 LINE ID',
      path: ['lineId'],
    }
  );

export type RegisterFormValues = z.infer<typeof registerSchema>;
