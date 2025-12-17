import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { loginApi } from '@/services/auth';
import { useAuthStore } from '@/stores/auth-store';
import { LoginRequest } from '@/types/api';
import { ApiError } from '@/lib/api-client';

// TODO: 後端修好 SSL 後改成 false
const MOCK_LOGIN = true;

export function useLogin() {
  const router = useRouter();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      if (MOCK_LOGIN) {
        // 模擬登入 - 等後端修好 SSL 後移除
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
          success: true,
          message: null,
          errorCode: null,
          data: {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            expiresIn: 3600,
          },
          timestamp: new Date().toISOString(),
        };
      }
      return loginApi(credentials);
    },
    onSuccess: (response) => {
      if (response.success && response.data) {
        login(response.data.accessToken, response.data.refreshToken);
        toast.success('登入成功');
        router.push('/venues');
      } else {
        toast.error(response.message || '登入失敗');
      }
    },
    onError: (error: Error) => {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          toast.error('Email 或密碼錯誤');
        } else {
          toast.error(error.message || '登入失敗，請稍後再試');
        }
      } else {
        toast.error('網路錯誤，請檢查連線');
      }
    },
  });
}
