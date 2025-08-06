import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: 'http://localhost:8090',
  realm: 'listtick',
  clientId: 'listtick-frontend'
});
