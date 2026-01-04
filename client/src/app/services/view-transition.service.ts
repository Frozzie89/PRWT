import { inject, Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { getAnimationDirection } from '../config/navigation-animation.config';

/**
 * Service that manages view transition directions based on navigation events.
 * Sets the data-vt-dir attribute on the document root to control CSS animations.
 */
@Injectable({
  providedIn: 'root',
})
export class ViewTransitionService {
  private readonly router = inject(Router);
  private previousUrl = '/groups';

  /**
   * Initializes the view transition tracking.
   * Should be called once during app initialization.
   */
  initialize(): void {
    const root = document.documentElement;

    this.router.events
      .pipe(filter((e): e is NavigationStart => e instanceof NavigationStart))
      .subscribe(event => {
        const targetUrl = event.url;
        const fromUrl = this.previousUrl;

        const direction = getAnimationDirection(fromUrl, targetUrl);

        if (direction) {
          root.dataset['vtDir'] = direction;
        } else {
          delete root.dataset['vtDir'];
        }

        this.previousUrl = targetUrl;
      });
  }
}
