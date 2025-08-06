import { ShoppingListCategoryResponse } from '@/types/shoppingListCategory.ts';

export interface ShoppingListResponse {
  id: string;
  name: string;
  active: boolean;
  shared: boolean;
  creationDate: Date;
  category: ShoppingListCategoryResponse;
  accountId: string;
  sharedWithAccounts?: AccountSharedWithResponse[];
}

export interface AccountSharedWithRequest {
  email: string;
  costFactor: number;
}

export interface AccountSharedWithResponse {
  email: string;
  costFactor: number;
}

export interface ShoppingListRequest {
  name: string;
  categoryId: string;
  shared: boolean;
  sharedWithAccounts?: AccountSharedWithRequest[];
}

export interface ShoppingListRequestUpdate {
  name?: string;
  active?: boolean;
  categoryId?: string;
}