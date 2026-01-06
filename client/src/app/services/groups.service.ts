import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { CreateGroupPayload, Group } from '../interfaces/group';
import { GroupsRepository, PbGroupRecord } from '../repositories/groups-repository';
import { from } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private readonly groupsRepository = inject(GroupsRepository);
  private readonly destroyRef = inject(DestroyRef);

  private readonly _groups = signal<Group[]>([]);
  readonly groups = this._groups.asReadonly();
  readonly count = computed(() => this._groups().length);

  private realtimeEnabled = false;

  async load() {
    const list = await this.groupsRepository.list();
    this._groups.set(list);
  }

  async getById(id: string): Promise<Group> {
    const group = this.groups().find(g => g.id === id);
    if (!group) {
      throw new Error(`Group with id ${id} not found`);
    }
    return group;
  }

  titleAlreadyExists(title: string) {
    return this._groups().some(g => g.title === title);
  }

  async add(group: CreateGroupPayload) {
    return await this.groupsRepository.create(group);
  }

  async removeById(id: string) {
    await this.groupsRepository.delete(id);
    this._groups.update(groups => groups.filter(g => g.id !== id));
  }

  enableRealtime() {
    if (this.realtimeEnabled) {
      return;
    }

    this.realtimeEnabled = true;

    from(
      this.groupsRepository.subscribeAll(e => {
        if (e.action === 'create') {
          const group = this.groupsRepository.toGroup(e.record as PbGroupRecord);
          this._groups.update(gs => [group, ...gs]);
        }

        if (e.action === 'delete') {
          this._groups.update(gs => gs.filter(g => g.id !== e.record.id));
        }

        if (e.action === 'update') {
          const updated = this.groupsRepository.toGroup(e.record as PbGroupRecord);
          this._groups.update(gs => gs.map(g => (g.id === updated.id ? updated : g)));
        }
      }),
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
