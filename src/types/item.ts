export interface ItemResponse {
  id?: string;
  name: string;
  value: number;
}

export interface ItemRequest {
  name: string;
  value?: number;
  shoppingListId: string;
}

export interface ItemRequestUpdate {
  name: string;
  value?: number;
}