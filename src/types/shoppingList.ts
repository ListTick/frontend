import { ShoppingListCategory } from '@/types/shoppingListCategory.ts';

export interface ShoppingListResponse {
  id?: string;
  name: string;
  active: boolean;
  shared: boolean;
  creationDate: Date;
  category: ShoppingListCategory;
  accountId: string;
}

export interface AccountSharedWithRequest {
  email: string;
  costFactor: number;
}

export interface ShoppingListRequest {
  name: string;
  active: boolean;
  categoryId: string;
  shared: boolean;
  sharedWithAccounts?: AccountSharedWithRequest[];
}

export interface ShoppingListRequestUpdate {
  name?: string;
  active?: boolean;
  categoryId?: string;
}