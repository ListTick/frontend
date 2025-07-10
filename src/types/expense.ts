import { ItemResponse } from '@/types/item.ts';

export interface ExpenseResponse {
  id: string;
  amount: number;
  currency: string;
  reimbursed: boolean;
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