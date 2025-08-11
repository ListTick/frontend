import React, { useEffect, useState } from 'react';
import { KeycloakContext } from './KeycloakContext.tsx';
import { CircularProgress } from '@mui/material';
import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: '/auth',
  realm: 'listtick',
  clientId: 'listtick-frontend',
});

export const KeycloakProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: 'check-sso',
          checkLoginIframe: false,
          pkceMethod: 'S256',
          flow: 'standard'
        });
        if (authenticated) {
          console.log('User is authenticated');
        } else {
          console.log('User is not authenticated');
        }
      } catch (error) {
        console.error('Failed to initialize adapter:', error, {
          message: (error as Error)?.message,
          stack: (error as Error)?.stack,
        });
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh' }}>
        <CircularProgress />
      </div>
    );

  return <KeycloakContext.Provider value={keycloak}>{children}</KeycloakContext.Provider>;
};