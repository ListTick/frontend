import { api } from '@/config/axios';
import { BucketListRequest, BucketListRequestUpdate, BucketListResponse } from '@/types/bucketList';

enum BucketListAPI {
  BUCKET_LISTS = 'bucket-lists'
}

export const getAllBucketListsByAccountId = async (): Promise<BucketListResponse[]> => {
  try {
    const response = await api.get(BucketListAPI.BUCKET_LISTS);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
}

export const getBucketListById = async (id: string): Promise<BucketListResponse> => {
  try {
    const response = await api.get(`${BucketListAPI.BUCKET_LISTS}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bucket list by ID: ', error);
    throw error;
  }
}

export const createBucketList = async (bucketList: BucketListRequest): Promise<BucketListResponse> => {
  try {
    const response = await api.post(BucketListAPI.BUCKET_LISTS, bucketList);
    return response.data;
  } catch (error) {
    console.error('Error creating bucket list: ', error);
    throw error;
  }
};

export const updateBucketList = async (id: string, bucketList: BucketListRequestUpdate): Promise<BucketListResponse> => {
  try {
    const response = await api.put(`${BucketListAPI.BUCKET_LISTS}/${id}`, bucketList);
    return response.data;
  } catch (error) {
    console.error('Error updating bucket list: ', error);
    throw error;
  }
};

export const updateBucketListByFields = async (id: string, bucketList: BucketListRequestUpdate): Promise<BucketListResponse> => {
  try {
    const response = await api.patch(`${BucketListAPI.BUCKET_LISTS}/${id}`, bucketList);
    return response.data;
  } catch (error) {
    console.error('Error updating bucket list by fields: ', error);
    throw error;
  }
}

export const deleteBucketList = async (id: string): Promise<void> => {
  try {
    await api.delete(`${BucketListAPI.BUCKET_LISTS}/${id}`);
  } catch (error) {
    console.error('Error deleting bucket list: ', error);
    throw error;
  }
};
