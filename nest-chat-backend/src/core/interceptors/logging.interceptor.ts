import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { v4 } from 'uuid';
import { Request } from 'express';

export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const method = req.method;
    const url = req.url;
    const requestId = v4();
    Logger.log(
      `requestId: ${requestId} Method: ${method}, URL: ${url}, Body: ${JSON.stringify(req.body)}, Query: ${JSON.stringify(req.query)}`,
    );
    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        Logger.log(
          `requestId: ${requestId} ${method} ${url} ${Date.now() - now}ms`,
          context.getClass().name,
          JSON.stringify(data),
        );
        return data as unknown;
      }),
    );
  }
}
