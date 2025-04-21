import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: '/',
  realm: 'listtick',
  clientId: 'listtick-frontend'
});
