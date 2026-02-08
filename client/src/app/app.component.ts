import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ViewTransitionService } from './services/view-transition.service';
import { PocketbaseAuthService } from './services/pocketbase-auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly viewTransitionService = inject(ViewTransitionService);
  private readonly auth = inject(PocketbaseAuthService);

  constructor() {
    this.viewTransitionService.initialize();
    this.auth.refreshCurrentUser();
  }
}
