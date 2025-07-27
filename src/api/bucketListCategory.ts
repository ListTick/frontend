import { api } from '@/config/axios';
import { BucketListCategoryResponse, BucketListCategoryRequest } from '../types/bucketListCategory';

enum CategoryAPI {
  CATEGORY = '/bucket-lists/categories'
}


export const getAllBucketListCategoriesByAccountId = async (): Promise<BucketListCategoryResponse[]> => {
  try {
    const response = await api.get(CategoryAPI.CATEGORY);
    return response.data;
  } catch (error) {
    console.error('Error fetching bucket list categories: ', error);
    throw error;
  }
}

export const getBucketListCategoryById = async (id: string): Promise<BucketListCategoryResponse> => {
  try {
    const response = await api.get(`${CategoryAPI.CATEGORY}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bucket list category by ID: ', error);
    throw error;
  }
}

export const createBucketListCategory = async (category: BucketListCategoryRequest): Promise<BucketListCategoryResponse> => {
  try {
    const response = await api.post(CategoryAPI.CATEGORY, category);
    return response.data;
  } catch (error) {
    console.error('Error creating bucket list category: ', error);
    throw error;
  }
}

export const updateBucketListCategory = async (id: string, category: BucketListCategoryRequest): Promise<BucketListCategoryResponse> => {
  try {
    const response = await api.put(`${CategoryAPI.CATEGORY}/${id}`, category);
    return response.data;
  } catch (error) {
    console.error('Error updating bucket list category: ', error);
    throw error;
  }
}

export const updateBucketListCategoryByFields = async (id: string, category: BucketListCategoryRequest): Promise<BucketListCategoryResponse> => {
  try {
    const response = await api.patch(`${CategoryAPI.CATEGORY}/${id}`, category);
    return response.data;
  } catch (error) {
    console.error('Error updating bucket list category by fields: ', error);
    throw error;
  }
}

export const deleteBucketListCategory = async (id: string): Promise<void> => {
  try {
    await api.delete(`${CategoryAPI.CATEGORY}/${id}`);
  } catch (error) {
    console.error('Error deleting bucket list category: ', error);
    throw error;
  }
}

