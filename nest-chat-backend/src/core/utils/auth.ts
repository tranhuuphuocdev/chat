import * as jwt from 'jsonwebtoken';
import configs from '@core/configs';
import { AuthInfo, AuthPayload, AuthLoginOutput } from '@auth/auth.interface';
import logger from './logger';
const JWT_ACCESS_TOKEN_EXPIRE_TIME = configs.JWT_ACCESS_TOKEN_EXPIRE_TIME;
const JWT_REFRESH_TOKEN_EXPIRE_TIME = configs.JWT_REFRESH_TOKEN_EXPIRE_TIME;
const JWT_REFRESH_TOKEN_SECRET = configs.JWT_REFRESH_TOKEN_SECRET;
const JWT_ACCESS_TOKEN_SECRET = configs.JWT_ACCESS_TOKEN_SECRET;

export const generateAccessToken = async (
  payload: AuthPayload,
): Promise<AuthLoginOutput> => {
  try {
    const accessToken = await jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRE_TIME,
    });
    const refreshToken = await jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    logger.logError('generateAccessToken has error %s', error.message);
    throw new Error(error.message);
  }
};

export const verifyToken = async (accessToken: string): Promise<AuthInfo> => {
  try {
    const decoded: any = await jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET);
    const { id, username, role } = decoded;
    return {
      id,
      username,
      role,
    };
  } catch (error) {
    logger.logError('verifyToken has error %s', error.message);
    throw new Error(error.message);
  }
};
