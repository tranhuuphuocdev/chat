import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@core/exception-filters/exception-filter.filter';
import { LoggerInterceptor } from '@core/interceptors/logging.interceptor';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dtos/auth-command.dto';
import { CreateUserDto } from '@users/dtos/user-command.dto';
import { AuthInfo } from './auth.interface';
import { extractToken } from '@core/middlewares/auth.middleware';

@Controller('auth')
@UseInterceptors(LoggerInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: AuthLoginDto) {
    return await this.authService.login(body);
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }

  @Get('/verify')
  async verify(@Request() request: Request) {
    const accessToken: string = extractToken(request as any);
    const data: AuthInfo = await this.authService.verifyToken(accessToken);
    return data;
  }
}
