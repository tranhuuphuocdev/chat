import { AuthInfo } from '@auth/auth.interface';

export const getAuthInfo = (req: Request): AuthInfo => {
  const { userId = '', username = '', role = '', permissions = [] } = req?.headers as unknown as Record<string, any>;
  return {
      id: userId,
      username: String(username),
      role,
      permissions: permissions as string[],
  };
}