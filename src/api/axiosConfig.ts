import axios, { AxiosInstance } from 'axios';
import useKeycloak from '../hooks/useKeycloak.ts';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const keycloak = useKeycloak();

axiosInstance.interceptors.request.use(
  async (config) => {
    if (keycloak.authenticated) {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    } else {
      await keycloak.login();
    }
    return config;
  }
);

export default axiosInstance;