import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import useKeycloak from '../hooks/useKeycloak.ts';
import { useMemo } from 'react';

export function useAxios(): AxiosInstance {
  const keycloak = useKeycloak();

  return useMemo(() => {
    const instance = axios.create({
      baseURL: 'http://localhost:8080/api',
      headers: { 'Content-Type': 'application/json' }
    });

    instance.interceptors.request.use(async (config) => {
      await keycloak.updateToken(60).catch(() => keycloak.logout());

      const headers = config.headers as AxiosRequestHeaders;
      headers.Authorization = `Bearer ${keycloak.token}`;
      return config;
    });

    return instance;
  }, [keycloak]);
}
