import { api } from '@/config/axios';
import { ShoppingListCategoryResponse, ShoppingListCategoryRequest } from '../types/shoppingListCategory';

enum CategoryAPI {
  CATEGORY = '/shopping-lists/categories'
}


export const getAllShoppingListCategoriesByAccountId = async (): Promise<ShoppingListCategoryResponse[]> => {
  try {
    const response = await api.get(CategoryAPI.CATEGORY);
    return response.data;
  } catch (error) {
    console.error('Error fetching shopping list categories: ', error);
    throw error;
  }
}

export const getShoppingListCategoryById = async (id: string): Promise<ShoppingListCategoryResponse> => {
  try {
    const response = await api.get(`${CategoryAPI.CATEGORY}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shopping list category by ID: ', error);
    throw error;
  }
}

export const createShoppingListCategory = async (category: ShoppingListCategoryRequest): Promise<ShoppingListCategoryResponse> => {
  try {
    const response = await api.post(CategoryAPI.CATEGORY, category);
    return response.data;
  } catch (error) {
    console.error('Error creating shopping list category: ', error);
    throw error;
  }
}

export const updateShoppingListCategory = async (id: string, category: ShoppingListCategoryRequest): Promise<ShoppingListCategoryResponse> => {
  try {
    const response = await api.put(`${CategoryAPI.CATEGORY}/${id}`, category);
    return response.data;
  } catch (error) {
    console.error('Error updating shopping list category: ', error);
    throw error;
  }
}

export const updateShoppingListCategoryByFields = async (id: string, category: ShoppingListCategoryRequest): Promise<ShoppingListCategoryResponse> => {
  try {
    const response = await api.patch(`${CategoryAPI.CATEGORY}/${id}`, category);
    return response.data;
  } catch (error) {
    console.error('Error updating shopping list category by fields: ', error);
    throw error;
  }
}

export const deleteShoppingListCategory = async (id: string): Promise<void> => {
  try {
    await api.delete(`${CategoryAPI.CATEGORY}/${id}`);
  } catch (error) {
    console.error('Error deleting shopping list category: ', error);
    throw error;
  }
}

