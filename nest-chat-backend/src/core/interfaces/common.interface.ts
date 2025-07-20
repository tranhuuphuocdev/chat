import { FilterQuery } from 'mongoose';

export type QueryCommon = Record<string, any>;

export type InputGetDetailCommon = {
  query: FilterQuery<QueryCommon>;
};

export type InputGetListCommon = {
  query: FilterQuery<QueryCommon>;
  orderBy?: Record<string, any>;
  paging?: {
    from: number;
    size: number;
    total?: number;
  };
  select?: string;
};

export type OutputGetListCommon<T> = {
  total: number;
  data: T[];
};

export type CreateDto = Record<string, any>;
export type UpdateDto = Record<string, any>;
