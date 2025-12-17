import { apiClient } from '@/lib/api-client';
import {
  ApiResponse,
  MerchantProfile,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from '@/types/api';

/** 取得商戶資料 */
export async function getMerchantProfile(): Promise<ApiResponse<MerchantProfile>> {
  return apiClient<ApiResponse<MerchantProfile>>('/merchant/profile');
}

/** 更新商戶資料 */
export async function updateMerchantProfile(
  data: UpdateProfileRequest
): Promise<ApiResponse<MerchantProfile>> {
  return apiClient<ApiResponse<MerchantProfile>>('/merchant/profile', {
    method: 'PUT',
    body: data,
  });
}

/** 修改密碼 */
export async function changePassword(
  data: ChangePasswordRequest
): Promise<ApiResponse<null>> {
  return apiClient<ApiResponse<null>>('/merchant/change-password', {
    method: 'POST',
    body: data,
  });
}
