import { Component, inject, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-group',
  imports: [],
  templateUrl: './list-group.component.html',
  styleUrl: './list-group.component.scss',
})
export class ListGroupComponent implements OnInit {
  private readonly groupsService = inject(GroupsService);
  private readonly router = inject(Router);

  readonly listGroup = this.groupsService.groups;

  ngOnInit() {
    void this.groupsService.load();
    this.groupsService.enableRealtime();
  }

  openGroup(groupId: string) {
    this.router.navigate(['/groups', groupId]);
  }
}
