import { UserModel } from './user.model';
import { FilterQuery } from 'mongoose';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum UserRoles {
  SUPER_ADMIN = 'super_admin',
  MANAGER = 'manager',
}

export type OutputUserItem = Partial<UserModel>;

export type QueryUser = {
  id?: string;
  username?: string;
  name?: string;
  status?: string;
};

export type InputGetListUser = {
  query: FilterQuery<QueryUser>;
  orderBy?: Record<string, any>;
  paging?: {
    from: number;
    size: number;
    total?: number;
  };
  select?: string;
};

export type OutputGetListUser = {
  total: number;
  data: OutputUserItem[];
};

export type InputGetDetailUser = {
  query: FilterQuery<QueryUser>;
};
