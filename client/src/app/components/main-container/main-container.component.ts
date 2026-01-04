import { Component, inject } from '@angular/core';
import { ListGroupComponent } from '../list-group/list-group.component';
import { CreateGroupPayload } from '../../interfaces/group';
import { GroupsService } from '../../services/groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-container',
  imports: [ListGroupComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
})
export class MainContainerComponent {
  private readonly groupsService = inject(GroupsService);
  private readonly router = inject(Router);

  onCreate($event: CreateGroupPayload) {
    this.groupsService.add($event);
  }

  ToAddForm() {
    this.router.navigate(['/groups/new']);
  }
}
