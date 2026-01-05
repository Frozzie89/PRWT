import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { GroupEntriesService } from '../../services/group-entries.service';
import { Group } from '../../interfaces/group';

@Component({
  selector: 'app-list-group-entries',
  imports: [FormsModule],
  templateUrl: './list-group-entries.component.html',
  styleUrl: './list-group-entries.component.scss',
})
export class ListGroupEntriesComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly groupEntriesService = inject(GroupEntriesService);

  private readonly groupFromRoute = toSignal(this.route.data.pipe(map(d => d['group'] as Group)), {
    initialValue: null,
  });

  readonly group = computed(() => this.groupFromRoute());

  readonly groupEntries = this.groupEntriesService.groupsEntries;

  newTextEntry = '';

  addEntry() {
    const group = this.group();
    if (!group) {
      return;
    }

    this.groupEntriesService.add({
      groupId: group.id,
      text: this.newTextEntry,
    });

    this.newTextEntry = '';
  }
}
