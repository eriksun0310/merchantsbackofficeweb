import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getMerchantProfile,
  updateMerchantProfile,
  changePassword,
} from '@/services/merchant';
import { useAuthStore } from '@/stores/auth-store';
import { UpdateProfileRequest, ChangePasswordRequest, MerchantProfile } from '@/types/api';
import { ApiError } from '@/lib/api-client';

// TODO: 後端修好 SSL 後改成 false
const MOCK_API = true;

const mockProfile: MerchantProfile = {
  id: '9f1c3d5a-1a2b-4c8e-9d11-000000000001',
  email: 'merchant01@test.com',
  companyName: '星辰科技有限公司',
  contactName: '張小明',
  phone: '0912-345-678',
  lineId: null,
  taxId: '12345678',
  address: '台北市中山區復興北路123號',
  status: 2,
  updatedAt: new Date().toISOString(),
};

/** 取得商戶資料 */
export function useMerchantProfile() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['merchant', 'profile'],
    queryFn: async () => {
      if (MOCK_API) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return mockProfile;
      }
      const response = await getMerchantProfile();
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || '取得資料失敗');
    },
    enabled: isAuthenticated,
  });
}

/** 更新商戶資料 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateMerchantProfile(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['merchant', 'profile'] });
        toast.success('資料更新成功');
      } else {
        toast.error(response.message || '更新失敗');
      }
    },
    onError: (error: Error) => {
      if (error instanceof ApiError) {
        toast.error(error.message || '更新失敗');
      } else {
        toast.error('網路錯誤，請檢查連線');
      }
    },
  });
}

/** 修改密碼 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePassword(data),
    onSuccess: (response) => {
      if (response.success) {
        toast.success('密碼修改成功');
      } else {
        toast.error(response.message || '密碼修改失敗');
      }
    },
    onError: (error: Error) => {
      if (error instanceof ApiError) {
        if (error.status === 400) {
          toast.error('目前密碼錯誤');
        } else {
          toast.error(error.message || '密碼修改失敗');
        }
      } else {
        toast.error('網路錯誤，請檢查連線');
      }
    },
  });
}
