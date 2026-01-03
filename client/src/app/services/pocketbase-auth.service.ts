import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import type { RecordModel } from 'pocketbase';
import { PocketbaseClientService } from './pocketbase-client.service';
import { environment } from '../../environments/environment';

interface AuthState {
  isValid: boolean;
  user: RecordModel | null;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class PocketbaseAuthService {
  private readonly pb = inject(PocketbaseClientService).pb;
  private readonly destroyRef = inject(DestroyRef);

  private readonly _auth = signal<AuthState>(this.snapshot());
  readonly user = computed(() => this._auth().user);
  readonly isLoggedIn = computed(() => this._auth().isValid);

  constructor() {
    const unsubscribe = this.pb.authStore.onChange(() => this._auth.set(this.snapshot()), true);
    this.destroyRef.onDestroy(() => unsubscribe());
  }

  async ensureDevAutoLogin(): Promise<void> {
    if (environment.production) {
      return;
    }

    if (!environment.devAutoLogin.enabled) {
      return;
    }

    if (this.pb.authStore.isValid) {
      return;
    }

    const { email, password } = environment.devAutoLogin;

    if (!email || !password) {
      return;
    }

    try {
      await this.loginWithCredentials(email, password);
    } catch (err) {
      console.warn('[DEV] Auto-login failed:', err);
    }
  }

  async loginWithCredentials(email: string, password: string) {
    return this.pb.collection('users').authWithPassword(email, password);
  }

  async loginWithOAuth2() {
    throw new Error('OAuth2 login is not implemented yet.');
  }

  logout() {
    this.pb.authStore.clear();
  }

  private snapshot(): AuthState {
    return {
      isValid: this.pb.authStore.isValid,
      user: this.pb.authStore.record,
      token: this.pb.authStore.token,
    };
  }
}
