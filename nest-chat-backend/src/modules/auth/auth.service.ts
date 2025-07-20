import { Injectable } from '@nestjs/common';
import { UserRepository } from '@users/user.repository.mongo';
import { AuthLoginDto } from './dtos/auth-command.dto';
import { CreateUserDto } from '@modules/users/dtos/user-command.dto';
import { ApiError } from '@core/exception-filters/exception-invalid-data.filter';
import { QueryUser, OutputUserItem, UserStatus } from '@users/user.interface';
import { AuthLoginOutput, AuthInfo } from './auth.interface';
import { UserService } from '@users/user.service';
import { generateAccessToken, verifyToken } from '@core/utils/auth';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private userService: UserService;
  constructor(private readonly userRepository: UserRepository) {
    this.userService = new UserService(this.userRepository);
  }

  async login(input: AuthLoginDto): Promise<AuthLoginOutput> {
    const { username, password } = input;
    const query: QueryUser = {
      username,
      status: UserStatus.ACTIVE,
    };
    const user: OutputUserItem | null = await this.userService.getOne({
      query,
    });
    if (!user || (user && Object.keys(user).length === 0)) {
      throw new ApiError('User not found', 400);
    }
    const isPasswordValid = bcrypt.compareSync(
      password,
      user.password as string,
    );
    if (!isPasswordValid) {
      throw new ApiError('Password is not correct', 400);
    }

    const token: AuthLoginOutput = await generateAccessToken({
      id: user._id?.toString() as string,
      username: user.username as string,
      role: user.role as string,
    });

    return token;
  }

  async register(input: CreateUserDto): Promise<OutputUserItem | null> {
    return await this.userService.create(input);
  }

  async verifyToken(token: string): Promise<AuthInfo> {
    return await verifyToken(token);
  }
}
