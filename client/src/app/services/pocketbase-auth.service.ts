import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import type { RecordModel } from 'pocketbase';
import { PocketbaseClientService } from './pocketbase-client.service';
import { CurrentUser } from '../interfaces/current-user';

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
  readonly userRecord = computed(() => this._auth().user);
  readonly isLoggedIn = computed(() => this._auth().isValid);

  readonly currentUser = computed<CurrentUser | null>(() => {
    const r = this._auth().user;
    if (!this._auth().isValid || !r) return null;

    return {
      id: r.id,
      discordId: (r as any).discordId,
      handle: (r as any).handle,
      displayName: (r as any).displayName,
      role: (r as any).role,
      avatarUrl: (r as any).avatarUrl,
    };
  });

  constructor() {
    const unsubscribe = this.pb.authStore.onChange(() => this._auth.set(this.snapshot()), true);
    this.destroyRef.onDestroy(() => unsubscribe());
  }

  async loginWithOAuth2(): Promise<void> {
    // Initiate OAuth2 login with Discord provider
    const response = await this.pb.collection('users').authWithOAuth2({
      provider: 'discord',
      scopes: ['identify'],
    });

    // Update user record with additional info from Discord
    const userId = this.pb.authStore.record?.id;
    const raw = (response as any)?.meta?.rawUser;

    if (!userId || !raw) {
      return;
    }

    // Update user details in PocketBase with data from Discord
    try {
      const updated = await this.pb.collection('users').update(userId, {
        discordId: raw.id,
        handle: raw.username,
        displayName: raw.global_name || raw.username,
        role: 'user',
      });

      this.pb.authStore.save(this.pb.authStore.token, updated);
    } catch (err) {
      console.error('User update after OAuth failed:', err);
      throw err;
    }
  }

  async refreshCurrentUser(): Promise<void> {
    if (!this.pb.authStore.isValid || !this.pb.authStore.record?.id) {
      return;
    }

    const fresh = await this.pb.collection('users').getOne(this.pb.authStore.record.id);
    this.pb.authStore.save(this.pb.authStore.token, fresh);
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
