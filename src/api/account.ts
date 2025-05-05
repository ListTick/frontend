import { api } from '@/config/axios.ts';

enum AccountApi {
  ACCOUNT = 'account'
}

export const getAccountSettings = async () => {
  try {
    const response = await api.get(AccountApi.ACCOUNT);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching account settings: ', error);
    throw error;
  }
};
