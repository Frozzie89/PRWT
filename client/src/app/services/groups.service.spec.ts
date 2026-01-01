import { TestBed } from '@angular/core/testing';

import { GroupsService } from './groups.service';

describe('GroupsService', () => {
  let service: GroupsService;

  // mock groups items
  const mockGroups = [
    {
      title: 'Item 1',
      description: 'Description for Item 1',
      icon: 'https://picsum.photos/200?random=1000',
      color: '#ff0000',
    },
    {
      title: 'Item 2',
      description: 'Description for Item 2',
      icon: 'https://picsum.photos/200?random=1001',
      color: '#00ff00',
    },
    {
      title: 'Item 3',
      description: 'Description for Item 3',
      icon: 'https://picsum.photos/200?random=1002',
      color: '#0000ff',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsService);

    // ensure groups are cleared and set mock groups before each test
    service.clear();
    mockGroups.forEach(group => service.add(group));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new group', () => {
    const newGroup = {
      title: 'Item 4',
      description: 'Description for Item 4',
      icon: 'https://picsum.photos/200?random=1001',
      color: '#000000',
    };
    service.add(newGroup);
    expect(service.groups().length).toBe(4);
    expect(service.groups()[0]).toEqual(newGroup);
  });

  it('should remove a group by title', () => {
    service.removeByTitle('Item 2');
    expect(service.groups().length).toBe(2);
    expect(service.titleAlreadyExists('Item 2')).toBeFalse();
  });

  it('should clear all groups', () => {
    service.clear();
    expect(service.groups().length).toBe(0);
  });

  it('should check if title already exists', () => {
    expect(service.titleAlreadyExists('Item 1')).toBeTrue();
    expect(service.titleAlreadyExists('Nonexistent Item')).toBeFalse();
  });
});
