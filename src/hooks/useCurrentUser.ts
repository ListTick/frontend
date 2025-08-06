import useKeycloak from './useKeycloak.ts';
import { useEffect, useState } from 'react';
import { KeycloakProfile } from 'keycloak-js';

export const useCurrentUser = () => {
  const keycloak = useKeycloak();
  const [profile, setProfile] = useState<null | KeycloakProfile>(null);

  useEffect(() => {
    if (!keycloak.authenticated) return;

    keycloak.loadUserProfile().then(setProfile).catch(console.error);
  }, [keycloak]);

  return {
    id: keycloak.tokenParsed?.sub,
    email: keycloak.tokenParsed?.email,
    roles: keycloak.tokenParsed?.realm_access?.roles ?? [],
    profile // { firstName, lastName, email, … }
  };
};
