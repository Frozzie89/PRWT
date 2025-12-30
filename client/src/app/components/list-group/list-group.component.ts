import { Component, inject } from '@angular/core';
import { ListGroup } from '../../interfaces/list-group';
import { GroupsService } from '../../service/groups.service';

@Component({
  selector: 'app-list-group',
  imports: [],
  templateUrl: './list-group.component.html',
  styleUrl: './list-group.component.scss',
})
export class ListGroupComponent {
  groupsService = inject(GroupsService);

  listGroup = this.groupsService.groups;
}
