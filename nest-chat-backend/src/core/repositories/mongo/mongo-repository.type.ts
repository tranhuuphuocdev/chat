import {
  InputGetDetailCommon,
  QueryCommon,
  InputGetListCommon,
  CreateDto,
  UpdateDto,
} from '@core/interfaces/common.interface';

export interface MongoRepositoryInterface<T> {
  getAll(input: InputGetListCommon): Promise<T[]>;

  getOne(input: InputGetDetailCommon): Promise<T | null>;

  countDocuments(query: QueryCommon): Promise<number>;

  create(data: CreateDto): Promise<T>;

  update(data: UpdateDto): Promise<T | null>;

  delete(id: string): Promise<T | null>;
}
