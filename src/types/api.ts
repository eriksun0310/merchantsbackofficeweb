/** 統一 API 回應格式 */
export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string | null;
  errorCode: string | null;
  data: T;
  timestamp: string;
};

/** 登入請求 */
export type LoginRequest = {
  email: string;
  password: string;
};

/** 登入回應 */
export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

/** 商戶資料 */
export type MerchantProfile = {
  id: string;
  email: string;
  companyName: string;
  contactName: string | null;
  phone: string | null;
  lineId: string | null;
  taxId: string | null;
  address: string | null;
  status: number; // 1=待審核, 2=已啟用, 3=已停用, 4=已拒絕
  updatedAt: string;
};

/** 更新商戶資料請求 */
export type UpdateProfileRequest = {
  contactName: string;
  phone?: string | null;
  lineId?: string | null;
};

/** 修改密碼請求 */
export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
