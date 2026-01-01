import { TestBed } from '@angular/core/testing';

import { PocketbaseAuthService } from './pocketbase-auth.service';

describe('PocketbaseAuthService', () => {
  let service: PocketbaseAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketbaseAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
