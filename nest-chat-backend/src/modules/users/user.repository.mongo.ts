import { CreateUserDto, UpdateUserDto } from './dtos/user-command.dto';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './user.model';
import {
  InputGetDetailUser,
  InputGetListUser,
  QueryUser,
  UserStatus,
} from './user.interface';
import { AbstractBaseRepository } from '@core/repositories/abstract-base.repository';
import { MongoRepositoryInterface } from '@core/repositories/mongo/mongo-repository.type';

@Injectable()
export class UserRepository
  extends AbstractBaseRepository<UserModel>
  implements MongoRepositoryInterface<UserModel>
{
  private readonly logger = new Logger(UserRepository.name);

  constructor(@InjectModel('user') private userModel: Model<UserModel>) {
    super();
  }

  async getAll(input: InputGetListUser): Promise<UserModel[]> {
    const {
      query = {},
      paging = { from: 0, size: 10 },
      orderBy = { createdAt: 'desc' },
      select = '',
    } = input;
    const queryMongo = this.buildMongoQuery(query);
    const data = await this.userModel
      .find(queryMongo)
      .sort(orderBy)
      .skip(paging.from)
      .limit(paging.size)
      .select(select)
      .lean()
      .exec();

    return data;
  }

  async countDocuments(query: QueryUser): Promise<number> {
    const queryMongo = this.buildMongoQuery(query);
    const count = await this.userModel.countDocuments(queryMongo).exec();
    return count;
  }

  async getOne(input: InputGetDetailUser): Promise<UserModel | null> {
    const { query } = input;
    const queryMongo = this.buildMongoQuery(query);
    const result = await this.userModel.findOne(queryMongo).lean().exec();
    return result;
  }

  async create(input: CreateUserDto): Promise<UserModel> {
    const result: UserModel = await this.userModel.create(input);
    return result.toObject();
  }

  async update(input: Partial<UpdateUserDto>): Promise<UserModel | null> {
    const { id, ...rest } = input;
    return await this.userModel
      .findOneAndUpdate({ _id: id }, rest, { new: true, lean: true })
      .lean()
      .exec();
  }

  async delete(id: string): Promise<UserModel | null> {
    return await this.userModel
      .findOneAndUpdate(
        { _id: id },
        { status: UserStatus.INACTIVE },
        { new: true, lean: true },
      )
      .lean()
      .exec();
  }

  private buildMongoQuery(query: QueryUser): Record<string, any> {
    const { id, name, status, username } = query || {};
    const mongoQueryCondition: Record<string, any>[] = [];
    if (id && !['', null, undefined].includes(id)) {
      mongoQueryCondition.push({ _id: id });
    }

    if (name && !['', null, undefined].includes(name)) {
      mongoQueryCondition.push({ name: { $regex: name, $options: 'i' } });
    }

    if (username && !['', null, undefined].includes(username)) {
      mongoQueryCondition.push({ username: username });
    }

    if (status && !['', null, undefined].includes(status)) {
      mongoQueryCondition.push({ status });
    }

    let queryMongo = {};
    if (mongoQueryCondition.length > 0) {
      queryMongo = { $and: mongoQueryCondition };
    }

    return queryMongo;
  }
}
