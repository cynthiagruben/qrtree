import { KeycloakService } from 'keycloak-angular';
import { environment } from './environments/environments';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false
      }
    });
}