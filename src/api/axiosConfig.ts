import axios, { AxiosInstance } from 'axios';


export const createAxiosInstance = (getToken: () => string | null) => {
  const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10_000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  );

  return instance;
};