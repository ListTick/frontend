import React, { useEffect, useState } from 'react';
import { KeycloakContext } from './KeycloakContext.tsx';
import { CircularProgress } from '@mui/material';
import { keycloak } from './keycloak.ts';

let initPromise: Promise<boolean> | null = null;
const initKeycloak = () =>
  (initPromise ??= keycloak
    .init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      pkceMethod: 'S256'
    })
    .catch((error) => {
      console.error('Keycloak initialization failed:', error);
      return false;
    }));

export const KeycloakProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initKeycloak().finally(() => setReady(true));
  }, []);

  if (!ready)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh' }}>
        <CircularProgress />
      </div>
    );

  return <KeycloakContext.Provider value={keycloak}>{children}</KeycloakContext.Provider>;
};
