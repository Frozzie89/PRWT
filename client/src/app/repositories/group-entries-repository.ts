import { Injectable, inject } from '@angular/core';
import { PocketbaseClientService } from '../services/pocketbase-client.service';
import { RecordSubscription, UnsubscribeFunc } from 'pocketbase';
import { CreateGroupEntryPayload, GroupEntry } from '../interfaces/group-entry';

export interface PbGroupEntryRecord {
  id: string;
  groupId: string;
  text: string;
  created: string;
  updated: string;
}

@Injectable({ providedIn: 'root' })
export class GroupEntriesRepository {
  private readonly pb = inject(PocketbaseClientService).pb;
  private readonly collection = 'group_entries';

  async list(): Promise<GroupEntry[]> {
    const records = await this.pb.collection(this.collection).getFullList<PbGroupEntryRecord>({
      sort: '-created',
    });
    return records.map(r => this.toGroupEntry(r));
  }

  async listByGroupId(groupId: string): Promise<GroupEntry[]> {
    const records = await this.pb.collection(this.collection).getFullList<PbGroupEntryRecord>({
      sort: '-created',
      filter: `group_id="${groupId}"`,
    });
    return records.map(r => this.toGroupEntry(r));
  }

  async create(data: CreateGroupEntryPayload): Promise<GroupEntry> {
    const created = await this.pb.collection(this.collection).create<PbGroupEntryRecord>(data);
    return this.toGroupEntry(created);
  }

  delete(id: string): Promise<boolean> {
    return this.pb.collection(this.collection).delete(id);
  }

  subscribeAll(
    onEvent: (e: RecordSubscription<PbGroupEntryRecord>) => void,
  ): Promise<UnsubscribeFunc> {
    return this.pb.collection(this.collection).subscribe('*', onEvent);
  }

  unsubscribeAll(): Promise<void> {
    return this.pb.collection(this.collection).unsubscribe('*');
  }

  toGroupEntry(r: PbGroupEntryRecord): GroupEntry {
    return {
      id: r.id,
      text: r.text,
      groupId: r.groupId,
      created: r.created,
    };
  }
}
