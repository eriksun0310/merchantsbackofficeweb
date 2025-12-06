import { z } from 'zod';

/** 聯絡方式 */
export enum ContactMethod {
  LINE = 'line',
  PHONE = 'phone',
}

export const settingsSchema = z
  .object({
    // 帳號（唯讀）
    email: z.string().email(),
    // 密碼（可選，只有要修改時才填）
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
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
  .refine(
    (data) => {
      // 如果有填密碼，則確認密碼必須一致
      if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: '密碼不一致',
      path: ['confirmPassword'],
    }
  )
  .refine(
    (data) => {
      // 如果有填密碼，至少要 6 個字元
      if (data.password && data.password.length > 0) {
        return data.password.length >= 6;
      }
      return true;
    },
    {
      message: '密碼至少 6 個字元',
      path: ['password'],
    }
  )
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

export type SettingsFormValues = z.infer<typeof settingsSchema>;
