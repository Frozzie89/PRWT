import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroupEntriesComponent } from './list-group-entries.component';

describe('ListGroupEntriesComponent', () => {
  let component: ListGroupEntriesComponent;
  let fixture: ComponentFixture<ListGroupEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGroupEntriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGroupEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
