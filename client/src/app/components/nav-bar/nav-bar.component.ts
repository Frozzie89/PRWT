import { Component, inject } from '@angular/core';
import { PocketbaseAuthService } from '../../services/pocketbase-auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  readonly auth = inject(PocketbaseAuthService);

  private readonly welcomeMessageTemplates: readonly string[] = [
    'Achievement unlocked: {username} logged in 🏆',
    'Breaking news: {username} has joined',
    "Plot twist: it's {username}",
    'Main character detected: {username}',
    'Reality check passed. Hi {username}',
    'Narrator: "And then {username} appeared."',
    'Unexpected guest spotted: {username}',
    'This is not a drill. {username} is here',
    'User spawn event: {username}',
    'Legend says {username} would return.',
    'Behold… {username} has arrived',
    'Critical update: {username} online',
    'The prophecy speaks of {username}',
    'Chaos level increased. Hi {username}',
    'And just like that… {username} is here',
    'All hail {username} 🙌',
    'The timeline has been altered by {username}',
    'New challenger approaches: {username}',
    'Somehow, {username} returned',
  ];

  private lastWelcomeUsername: string | undefined;
  private lastWelcomeMessage = '';

  welcomeMessage(): string {
    const username = this.auth.currentUser()?.displayName ?? 'User';

    if (username !== this.lastWelcomeUsername || !this.lastWelcomeMessage) {
      this.lastWelcomeUsername = username;
      const templates = this.welcomeMessageTemplates;
      const randomIndex = Math.floor(Math.random() * templates.length);
      const template = templates[randomIndex];
      this.lastWelcomeMessage = template.replace('{username}', username);
    }

    return this.lastWelcomeMessage;
  }
}
