import { api } from '@/config/axios';
import { Tag } from '@/types/tag';

enum TagApi {
  TAG = 'tag'
}

export const getTagsByUserId = async (): Promise<Tag[]> => {
  try {
    const response = await api.get(TagApi.TAG);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};

export const createTag = async (tag: Tag): Promise<Tag> => {
  try {
    const response = await api.post(TagApi.TAG, tag);
    return response.data;
  } catch (error) {
    console.error('Error creating tag: ', error);
    throw error;
  }
};

export const updateTag = async (tag: Tag, tagId: string): Promise<Tag> => {
  try {
    const response = await api.put(`${TagApi.TAG}/${tagId}`, tag);
    return response.data;
  } catch (error) {
    console.error('Error updating tag: ', error);
    throw error;
  }
};

export const deleteTag = async (tagId: string): Promise<void> => {
  try {
    const response = await api.delete(`${TagApi.TAG}/${tagId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting tag: ', error);
    throw error;
  }
};
