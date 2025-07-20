export type AuthLoginOutput = {
  accessToken: string;
  refreshToken: string;
};

export type AuthPayload = {
  id: string;
  username: string;
  role: string;
  email?: string;
  phone?: string;
};

export type AuthInfo = {
  id: string;
  username: string;
  role: string;
  permissions?: string[];
};
