import { IBaseRepository } from './base-repository.interface';
import {
  InputGetDetailCommon,
  QueryCommon,
  InputGetListCommon,
  CreateDto,
  UpdateDto,
} from '@core/interfaces/common.interface';

export abstract class AbstractBaseRepository<T> implements IBaseRepository<T> {
  abstract getAll(input: InputGetListCommon): Promise<T[]>;

  abstract getOne(input: InputGetDetailCommon): Promise<T | null>;

  abstract countDocuments(query: QueryCommon): Promise<number>;

  abstract create(data: CreateDto): Promise<T>;

  abstract update(data: UpdateDto): Promise<T | null>;

  abstract delete(id: string): Promise<T | null>;
}
