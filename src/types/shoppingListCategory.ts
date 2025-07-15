export interface ShoppingListCategoryRequest {
  name: string;
  colour?: string;
}

export interface ShoppingListCategoryResponse {
  id: string;
  name: string;
  colour: string;
}