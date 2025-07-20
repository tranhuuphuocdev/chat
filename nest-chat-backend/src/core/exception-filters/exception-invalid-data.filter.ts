import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(
    message: string | Record<string, any>,
    status: number = HttpStatus.BAD_REQUEST,
  ) {
    super({ status, message }, status);
  }
}
