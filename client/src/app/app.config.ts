import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { PocketbaseAuthService } from './services/pocketbase-auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideAppInitializer(() => {
      const auth = inject(PocketbaseAuthService);
      return auth.ensureDevAutoLogin();
    }),
  ],
};
