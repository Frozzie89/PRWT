import { computed, Injectable, signal } from '@angular/core';
import { ListGroupItem } from '../interfaces/list-group-item';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private readonly _groups = signal<ListGroupItem[]>([]);

  constructor() {
    this._groups.set([
      {
        title: 'Item 1',
        description: 'Description for Item 1',
        icon: 'https://picsum.photos/200?random=' + Math.floor(Math.random() * 1000),
        color: '#ffe600',
      },
      {
        title: 'Item 2',
        description: 'Description for Item 2',
        icon: 'https://picsum.photos/200?random=' + Math.floor(Math.random() * 1000),
        color: '#ff006e',
      },
      {
        title: 'Item 3',
        description: 'Description for Item 3',
        icon: 'https://picsum.photos/200?random=' + Math.floor(Math.random() * 1000),
        color: '#5aed1bff',
      },
    ]);
  }

  readonly groups = this._groups.asReadonly();
  readonly count = computed(() => this._groups().length);

  titleAlreadyExists(title: string) {
    return this._groups().some(g => g.title === title);
  }

  add(group: ListGroupItem) {
    this._groups.update(groups => [group, ...groups]);
  }

  removeByTitle(title: string) {
    this._groups.update(groups => groups.filter(g => g.title !== title));
  }

  clear() {
    this._groups.set([]);
  }
}
