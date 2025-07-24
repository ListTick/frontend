import { api } from '@/config/axios';
import { ShoppingListRequest, ShoppingListRequestUpdate, ShoppingListResponse } from '@/types/shoppingList';

enum ShoppingListAPI {
  SHOPPING_LISTS = 'shopping-lists'
}

export const getAllShoppingListsByAccountId = async (): Promise<ShoppingListResponse[]> => {
  try {
    const response = await api.get(ShoppingListAPI.SHOPPING_LISTS);
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
}

export const getShoppingListById = async (id: string): Promise<ShoppingListResponse> => {
  try {
    const response = await api.get(`${ShoppingListAPI.SHOPPING_LISTS}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shopping list by ID: ', error);
    throw error;
  }
}

export const createShoppingList = async (shoppingList: ShoppingListRequest): Promise<ShoppingListResponse> => {
  try {
    const response = await api.post(ShoppingListAPI.SHOPPING_LISTS, shoppingList);
    return response.data;
  } catch (error) {
    console.error('Error creating shopping list: ', error);
    throw error;
  }
};

export const updateShoppingList = async (id: string, shoppingList: ShoppingListRequestUpdate): Promise<ShoppingListResponse> => {
  try {
    const response = await api.put(`${ShoppingListAPI.SHOPPING_LISTS}/${id}`, shoppingList);
    return response.data;
  } catch (error) {
    console.error('Error updating shopping list: ', error);
    throw error;
  }
};

export const updateShoppingListByFields = async (id: string, shoppingList: ShoppingListRequestUpdate): Promise<ShoppingListResponse> => {
  try {
    const response = await api.patch(`${ShoppingListAPI.SHOPPING_LISTS}/${id}`, shoppingList);
    return response.data;
  } catch (error) {
    console.error('Error updating shopping list by fields: ', error);
    throw error;
  }
}

export const deleteShoppingList = async (id: string): Promise<void> => {
  try {
    await api.delete(`${ShoppingListAPI.SHOPPING_LISTS}/${id}`);
  } catch (error) {
    console.error('Error deleting shopping list: ', error);
    throw error;
  }
};
