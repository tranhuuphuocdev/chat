import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '@core/utils/auth';
import { AuthInfo } from '@auth/auth.interface';
import logger from '@core/utils/logger';

export async function verifyTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const accessToken: string = extractToken(req);
    const authInfo: AuthInfo = await verifyToken(accessToken);
    req.headers.username = authInfo.username;
    req.headers.role = authInfo.role;
    req.headers.userId = authInfo.id;
    req.headers.permissions = authInfo?.permissions || [];
    next();
  } catch (error) {
    logger.logError('Middleware -> verifyTokenMiddleware -> err: %j', error);
    return sendErrorResponse(res, { httpStatus: 401, code: 'Unauthorized' });
  }
}

function sendErrorResponse(
  res: Response,
  errorCode: { httpStatus: number; code: string },
) {
  return res.status(errorCode.httpStatus).send({
    data: null,
    errors: [errorCode.code],
  });
}

export function extractToken(req: Request): string {
  const authHeader = req.headers.authorization || '';
  let token = '';
  if (authHeader.startsWith('Bearer')) {
    token = authHeader.substring(7, authHeader.length);
  }
  return token;
}
