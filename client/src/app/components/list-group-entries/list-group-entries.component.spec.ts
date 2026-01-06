import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ListGroupEntriesComponent } from './list-group-entries.component';
import { GroupEntriesService } from '../../services/group-entries.service';

describe('ListGroupEntriesComponent', () => {
  let component: ListGroupEntriesComponent;
  let fixture: ComponentFixture<ListGroupEntriesComponent>;

  beforeEach(async () => {
    const activatedRouteStub = {
      data: of({ group: { id: 'test-id', name: 'Test Group' } }),
    };

    const groupEntriesServiceStub = {
      groupsEntries: () => [],
      loadByGroupId: jasmine.createSpy('loadByGroupId'),
      enableRealtime: jasmine.createSpy('enableRealtime'),
      add: jasmine.createSpy('add'),
    };

    await TestBed.configureTestingModule({
      imports: [ListGroupEntriesComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: GroupEntriesService, useValue: groupEntriesServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListGroupEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
