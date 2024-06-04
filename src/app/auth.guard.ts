import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected override readonly keycloakAngular: KeycloakService
  ) {
    super(router, keycloakAngular);
  }

  public async isAccessAllowed(): Promise<boolean> {
    if (!this.authenticated) {
      await this.keycloakAngular.login();
    }
    return this.authenticated;
  }
}