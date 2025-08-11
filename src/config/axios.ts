import axios, { AxiosRequestHeaders } from 'axios';
import { keycloak } from '../security/KeycloakProvider.tsx';

export const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use(async (config) => {
  await keycloak.updateToken(60).catch(() => keycloak.logout());

  const headers = config.headers as AxiosRequestHeaders;
  headers.Authorization = `Bearer ${keycloak.token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      await keycloak.logout();
    }
    return Promise.reject(error);
  }
);
