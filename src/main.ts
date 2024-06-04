import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environments';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { APP_INITIALIZER } from '@angular/core';
import { initializeKeycloak } from './keycloak-init';
import { provideHttpClient } from "@angular/common/http";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(KeycloakAngularModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
}).catch(err => console.error(err));