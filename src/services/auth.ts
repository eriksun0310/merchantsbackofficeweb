import { apiClient } from '@/lib/api-client';
import { ApiResponse, LoginRequest, LoginResponse } from '@/types/api';

export async function loginApi(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  return apiClient<ApiResponse<LoginResponse>>('/auth/login', {
    method: 'POST',
    body: credentials,
    skipAuth: true,
  });
}
