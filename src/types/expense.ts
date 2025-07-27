import { ItemResponse } from '@/types/shoppingListItem.ts';

export interface ExpenseResponse {
  id: string;
  amount: number;
  currency: string;
  reimbursed: boolean;
  shared: boolean;
  creationDate: Date;
  shoppingListId: string;
  items: ItemResponse[];
}

export interface ExpenseRequest {
  amount: number;
  currency: string;
  reimbursed: boolean;
  shoppingListId: string;
  items: string[];
}

export interface ExpenseRequestUpdate {
  amount?: number;
  currency?: string;
  reimbursed?: boolean;
}

export interface ExpenseShareResponse {
  id: string;
  amount: number;
  currency: string;
  reimbursed: boolean;
  creationDate: Date;
  accountId: string;
  expenseId: string;
}