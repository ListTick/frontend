import axiosInstance from './axiosConfig.ts';

export const apiService = {
  getData: async (endpoint: string) => {
    try {
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  postData: async (endpoint: string, data: any) => {
    try {
      const response = await axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
    }
  },

  putData: async (endpoint: string, data: any) => {
    try {
      const response = await axiosInstance.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error putting data', error);
    }
  },

  deleteData: async (endpoint: string, data: any) => {
    try {
      const response = await axiosInstance.delete(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error deleting data', error);
    }
  }

};