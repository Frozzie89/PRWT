import { Injectable, inject } from '@angular/core';
import { PocketbaseClientService } from '../services/pocketbase-client.service';
import type { Group, CreateGroupPayload } from '../interfaces/group';
import { RecordSubscription, UnsubscribeFunc } from 'pocketbase';

export interface PbGroupRecord {
  id: string;
  title: string;
  description: string;
  color: string;
  icon?: string;
  created: string;
  updated: string;
}

@Injectable({ providedIn: 'root' })
export class GroupsRepository {
  private readonly pb = inject(PocketbaseClientService).pb;
  private readonly collection = 'groups';

  async list(): Promise<Group[]> {
    const records = await this.pb.collection(this.collection).getFullList<PbGroupRecord>({
      sort: '-created',
    });
    return records.map(r => this.toGroup(r));
  }

  async create(data: CreateGroupPayload): Promise<Group> {
    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('description', data.description);
    fd.append('color', data.color);

    if (data.iconFile) {
      fd.append('icon', data.iconFile);
    }

    const created = await this.pb.collection(this.collection).create<PbGroupRecord>(fd);
    return this.toGroup(created);
  }

  delete(id: string): Promise<boolean> {
    return this.pb.collection(this.collection).delete(id);
  }

  subscribeAll(onEvent: (e: RecordSubscription<PbGroupRecord>) => void): Promise<UnsubscribeFunc> {
    return this.pb.collection(this.collection).subscribe('*', onEvent);
  }

  unsubscribeAll(): Promise<void> {
    return this.pb.collection(this.collection).unsubscribe('*');
  }

  toGroupFromRecord(record: PbGroupRecord): Group {
    return this['toGroup'](record as PbGroupRecord);
  }

  toGroup(r: PbGroupRecord): Group {
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      color: r.color,
      iconUrl: r.icon ? this.pb.files.getURL(r as PbGroupRecord, r.icon) : null,
    };
  }
}
