import { ItemRequest, ItemRequestUpdate, ItemResponse } from '@/types/item.ts';
import { api } from '@/config/axios.ts';

enum ItemAPI {
  ITEMS = 'shopping-lists/items'
}

export const getItemById = async (id: string): Promise<ItemResponse> => {
    try {
      const response = await api.get(`${ItemAPI.ITEMS}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching item by ID: ', error);
      throw error;
    }
}

export const getAllItemsByShoppingListId = async (id: string): Promise<ItemResponse[]> => {
  try {
    const response = await api.get(`${ItemAPI.ITEMS}/shopping-list/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items by shopping list ID: ', error);
    throw error;
  }
}

export const createItem = async (item: ItemRequest): Promise<ItemResponse> => {
    try {
      const response = await api.post(ItemAPI.ITEMS, item);
      return response.data;
    } catch (error) {
      console.error('Error creating item: ', error);
      throw error;
    }
}

export const updateItem = async (id: string, item: ItemRequestUpdate): Promise<ItemResponse> => {
    try {
      const response = await api.put(`${ItemAPI.ITEMS}/${id}`, item);
      return response.data;
    } catch (error) {
      console.error('Error updating item: ', error);
      throw error;
    }
}

export const updateItemByFields = async (id: string, item: ItemRequestUpdate): Promise<ItemResponse> => {
  try {
    const response = await api.patch(`${ItemAPI.ITEMS}/${id}`, item);
    return response.data;
  } catch (error) {
    console.error('Error updating item by fields: ', error);
    throw error;
  }
}

export const deactivateItem = async (id: string): Promise<void> => {
    try {
      await api.patch(`${ItemAPI.ITEMS}/${id}/deactivate`);
    } catch (error) {
      console.error('Error deactivating item: ', error);
      throw error;
    }
}
