import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import type { RecordModel } from 'pocketbase';
import { PocketbaseClientService } from './pocketbase-client.service';

@Injectable({
  providedIn: 'root',
})
export class PocketbaseAuthService {
  private readonly pb = inject(PocketbaseClientService).pb;
  private readonly destroyRef = inject(DestroyRef);

  private readonly _auth = signal<{
    isValid: boolean;
    user: RecordModel | null;
    token: string;
  }>({
    isValid: this.pb.authStore.isValid,
    user: this.pb.authStore.record,
    token: this.pb.authStore.token,
  });

  readonly user = computed(() => this._auth().user);
  readonly isLoggedIn = computed(() => this._auth().isValid);

  constructor() {
    // Bridge PocketBase auth changes -> Angular signals
    const unsubscribe = this.pb.authStore.onChange(() => {
      this._auth.set({
        isValid: this.pb.authStore.isValid,
        user: this.pb.authStore.record,
        token: this.pb.authStore.token,
      });
    }, true);

    // Clean up when the service is destroyed (tests, HMR, etc.)
    this.destroyRef.onDestroy(() => unsubscribe());
  }

  async loginWithProvider() {
    // Implement OAuth login flow here
    throw new Error('OAuth provider login not implemented yet');
  }

  async loginWithCredentials(email: string, password: string) {
    const authResponse = await this.pb.collection('users').authWithPassword(email, password);

    // Ensure the internal auth signal is synchronized immediately after a successful login
    this._auth.set({
      isValid: this.pb.authStore.isValid,
      user: this.pb.authStore.record,
      token: this.pb.authStore.token,
    });

    return authResponse;
  }

  logout() {
    this.pb.authStore.clear();
  }
}
