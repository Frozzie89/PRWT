import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import {
  GroupEntriesRepository,
  PbGroupEntryRecord,
} from '../repositories/group-entries-repository';
import { CreateGroupEntryPayload, GroupEntry } from '../interfaces/group-entry';
import { from } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class GroupEntriesService {
  private readonly groupEntriesRepository = inject(GroupEntriesRepository);
  private readonly destroyRef = inject(DestroyRef);

  private readonly _groupEntries = signal<GroupEntry[]>([]);
  readonly groupsEntries = this._groupEntries.asReadonly();

  private realtimeEnabled = false;

  async loadByGroupId(groupId: string) {
    const list = await this.groupEntriesRepository.listByGroupId(groupId);
    this._groupEntries.set(list);
  }

  async add(entry: CreateGroupEntryPayload) {
    return await this.groupEntriesRepository.create(entry);
  }

  async removeById(id: string) {
    await this.groupEntriesRepository.delete(id);
    this._groupEntries.update(entries => entries.filter(e => e.id !== id));
  }

  enableRealtime() {
    if (this.realtimeEnabled) {
      return;
    }

    this.realtimeEnabled = true;

    from(
      this.groupEntriesRepository.subscribeAll(e => {
        if (e.action === 'create') {
          const groupEntry = this.groupEntriesRepository.toGroupEntry(
            e.record as PbGroupEntryRecord,
          );
          this._groupEntries.update(entries => [groupEntry, ...entries]);
        }

        if (e.action === 'delete') {
          this._groupEntries.update(entries => entries.filter(entry => entry.id !== e.record.id));
        }

        if (e.action === 'update') {
          const updated = this.groupEntriesRepository.toGroupEntry(e.record as PbGroupEntryRecord);
          this._groupEntries.update(entries =>
            entries.map(entry => (entry.id === updated.id ? updated : entry)),
          );
        }
      }),
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
