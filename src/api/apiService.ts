import { createAxiosInstance } from './axiosConfig';

export const createApiService = (getToken: () => string | null) => {
  const axiosInstance = createAxiosInstance(getToken);

  return {
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
        throw error;
      }
    },

    putData: async (endpoint: string, data: any) => {
      try {
        const response = await axiosInstance.put(endpoint, data);
        return response.data;
      } catch (error) {
        console.error('Error putting data', error);
        throw error;
      }
    },

    deleteData: async (endpoint: string, data?: any) => {
      try {
        const response = await axiosInstance.delete(endpoint, { data });
        return response.data;
      } catch (error) {
        console.error('Error deleting data', error);
        throw error;
      }
    }

  };
};