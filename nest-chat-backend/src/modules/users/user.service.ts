import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository.mongo';
import { CreateUserDto, UpdateUserDto } from './dtos/user-command.dto';
import { ApiError } from '@core/exception-filters/exception-invalid-data.filter';
import {
  InputGetDetailUser,
  InputGetListUser,
  OutputGetListUser,
  OutputUserItem,
} from './user.interface';
import { UserModel } from './user.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private salt: string;
  constructor(private readonly userRepository: UserRepository) {
    this.salt = bcrypt.genSaltSync(10);
  }

  async getAll(input: InputGetListUser): Promise<OutputGetListUser> {
    const {
      query = {},
      paging = { from: 0, size: 10 },
      orderBy = { createdAt: 'desc' },
      select = '',
    } = input;
    const data: UserModel[] = await this.userRepository.getAll({
      query,
      paging,
      orderBy,
      select,
    });
    const total: number = await this.userRepository.countDocuments(query);
    return {
      total,
      data: data.map((item) => this.transformModel(item)),
    };
  }

  async create(input: CreateUserDto): Promise<OutputUserItem | null> {
    const { username, password } = input;
    const existingUser: OutputUserItem | null = await this.getOne({
      query: { username },
    });
    if (existingUser && Object.keys(existingUser).length > 0) {
      const err = new Array({
        field: 'username',
        message: 'Tên đăng nhập đã được sử dụng',
      });
      throw new ApiError(err, 400);
    }
    const hash = bcrypt.hashSync(password, this.salt);
    input.password = hash;
    const user: UserModel | null = await this.userRepository.create(input);
    return this.transformModel(user);
  }

  async update(input: Partial<UpdateUserDto>): Promise<OutputUserItem | null> {
    const { password, confirmPassword } = input;
    if (password) {
      if (password !== confirmPassword) {
        throw new ApiError('Password is not matched', 400);
      } else {
        const hash = bcrypt.hashSync(password, this.salt);
        input.password = hash;
      }
    }
    const user: UserModel | null = await this.userRepository.update(input);
    return this.transformModel(user);
  }

  async delete(id: string): Promise<OutputUserItem | null> {
    const user: UserModel | null = await this.userRepository.delete(id);
    return this.transformModel(user);
  }

  async getOne(input: InputGetDetailUser): Promise<OutputUserItem | null> {
    const user: UserModel | null = await this.userRepository.getOne(input);
    return this.transformModel(user);
  }

  private transformModel(dbData: UserModel | null): OutputUserItem {
    if (!dbData) {
      return {} as OutputUserItem;
    }
    return {
      ...dbData,
    };
  }
}
