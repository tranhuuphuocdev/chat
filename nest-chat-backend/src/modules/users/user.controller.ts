import {
  Controller,
  Get,
  Put,
  Body,
  UseFilters,
  UseInterceptors,
  Request,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@core/exception-filters/exception-filter.filter';
import { LoggerInterceptor } from '@core/interceptors/logging.interceptor';
import { UserService } from './user.service';
import { AuthInfo } from '@auth/auth.interface';
import { getAuthInfo } from '@core/utils/common';
import {
  InputGetDetailUser,
  InputGetListUser,
  OutputUserItem,
  UserStatus,
} from './user.interface';
import { DeleteUserDto, UpdateUserDto } from './dtos/user-command.dto';

@Controller('user')
@UseInterceptors(LoggerInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getMe(@Request() request: Request) {
    const authInfo: AuthInfo = getAuthInfo(request);
    const userId: string = authInfo.id;
    const data: OutputUserItem | null = await this.userService.getOne({
      query: { id: userId },
    });
    return data;
  }

  @Put('/update-profile')
  async update(@Request() request: Request, @Body() body: UpdateUserDto) {
    if (!body.id) {
      const authInfo: AuthInfo = getAuthInfo(request);
      const userId: string = authInfo.id;
      body.id = userId;
    }
    const data = await this.userService.update(body);
    return data;
  }

  @Post('')
  async getAll(@Body() body: InputGetListUser) {
    const { data, total } = await this.userService.getAll(body);
    return {
      data,
      total,
    };
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const input: InputGetDetailUser = { query: { id: id } };
    return await this.userService.getOne(input);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  async deleteUser(@Param('id') id: string) {
    const input: DeleteUserDto = { id, status: UserStatus.INACTIVE };
    return await this.userService.update(input);
  }
}
