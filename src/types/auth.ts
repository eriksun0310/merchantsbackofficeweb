/** 使用者資料 */
export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
};

/** 登入憑證 */
export type LoginCredentials = {
  email: string;
  password: string;
};

/** 註冊資料 */
export type RegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

/** 認證狀態 */
export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};
