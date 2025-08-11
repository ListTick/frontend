import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: '/auth',             // Nginx proxy → Keycloak
  realm: 'listtick',
  clientId: 'listtick-frontend',
});
