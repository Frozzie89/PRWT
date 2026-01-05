import { TestBed } from '@angular/core/testing';

import { GroupEntriesService } from './group-entries.service';

describe('GroupEntriesService', () => {
  let service: GroupEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
