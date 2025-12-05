import { User } from '@/types/auth';

export const mockUser: User = {
  id: 'u1',
  email: 'demo@ptalk.com',
  name: '王小明',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
  createdAt: '2024-01-01T00:00:00Z',
};

/** Mock 登入驗證 */
export const mockCredentials = {
  email: 'demo@ptalk.com',
  password: 'demo1234',
};
