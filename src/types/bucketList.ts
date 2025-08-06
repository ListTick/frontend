import { BucketListCategoryResponse } from '@/types/bucketListCategory.ts';

export interface BucketListResponse {
  id: string;
  name: string;
  active: boolean;
  shared: boolean;
  creationDate: Date;
  category: BucketListCategoryResponse;
  accountId: string;
  sharedWithAccounts?: AccountSharedWithResponse[];
}

export interface AccountSharedWithRequest {
  email: string;
}

export interface AccountSharedWithResponse {
  email: string;
}

export interface BucketListRequest {
  name: string;
  categoryId: string;
  shared: boolean;
  sharedWithAccounts?: AccountSharedWithRequest[];
}

export interface BucketListRequestUpdate {
  name?: string;
  active?: boolean;
  categoryId?: string;
}