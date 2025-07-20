import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status: number = exception.getStatus();
    const responseObject: string | Record<string, any> =
      exception.getResponse() as Record<string, any>;
    let messages: any = [];

    if (typeof responseObject === 'string') {
      messages = [{ message: responseObject }];
    } else if (typeof responseObject === 'object' && responseObject !== null) {
      if (Array.isArray(responseObject.message)) {
        messages = responseObject.message.map((item: any) => {
          if (typeof item === 'string') {
            return { message: item };
          }
          return {
            field: item.field || null,
            message: item.message || JSON.stringify(item),
          };
        });
      } else if (typeof responseObject.message === 'string') {
        messages = [{ message: responseObject.message }];
      } else {
        messages = [{ message: JSON.stringify(responseObject.message) }];
      }
    } else {
      messages = [{ message: exception.message }];
    }

    response.status(status).json({
      statusCode: status,
      errors: messages,
      data: null,
    });
  }
}
