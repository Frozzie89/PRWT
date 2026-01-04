import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-list-groups',
  imports: [],
  templateUrl: './list-groups.component.html',
  styleUrl: './list-groups.component.scss',
})
export class ListGroupsComponent implements OnInit {
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

  navigateToAddForm() {
    this.router.navigate(['/groups/new']);
  }
}
