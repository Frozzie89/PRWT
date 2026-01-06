import { TestBed } from '@angular/core/testing';
import { GroupsService } from './groups.service';
import { GroupsRepository } from '../repositories/groups-repository';
import type { Group } from '../interfaces/group';

describe('GroupsService', () => {
  let service: GroupsService;
  let repo: jasmine.SpyObj<GroupsRepository>;

  const mockGroups: Group[] = [
    {
      id: '1',
      title: 'Item 1',
      description: 'Description for Item 1',
      iconUrl: 'https://picsum.photos/200?random=1000',
      color: '#ff0000',
    },
    {
      id: '2',
      title: 'Item 2',
      description: 'Description for Item 2',
      iconUrl: 'https://picsum.photos/200?random=1001',
      color: '#00ff00',
    },
    {
      id: '3',
      title: 'Item 3',
      description: 'Description for Item 3',
      iconUrl: 'https://picsum.photos/200?random=1002',
      color: '#0000ff',
    },
  ];

  beforeEach(() => {
    repo = jasmine.createSpyObj<GroupsRepository>('GroupsRepository', [
      'list',
      'create',
      'delete',
      'subscribeAll',
    ]);

    TestBed.configureTestingModule({
      providers: [GroupsService, { provide: GroupsRepository, useValue: repo }],
    });

    service = TestBed.inject(GroupsService);
  });

  it('should load groups from repository', async () => {
    repo.list.and.resolveTo(mockGroups);

    await service.load();

    expect(service.groups()).toEqual(mockGroups);
    expect(service.count()).toBe(3);
  });

  it('should check if title already exists', async () => {
    repo.list.and.resolveTo(mockGroups);
    await service.load();

    expect(service.titleAlreadyExists('Item 1')).toBeTrue();
    expect(service.titleAlreadyExists('Item 4')).toBeFalse();
  });
});
