import { Component, HostListener, inject } from '@angular/core';
import { ListGroupComponent } from '../list-group/list-group.component';
import { NewGroupComponent } from '../new-group/new-group.component';
import { ListGroupItem } from '../../interfaces/list-group-item';
import { GroupsService } from '../../service/groups.service';

@Component({
  selector: 'app-main-container',
  imports: [ListGroupComponent, NewGroupComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
})
export class MainContainerComponent {
  groupsService = inject(GroupsService);

  isAdding = false;

  slideToAddForm() {
    this.isAdding = true;
  }

  slideBack() {
    this.isAdding = false;
  }

  onCreate($event: ListGroupItem) {
    this.groupsService.add($event);
    this.slideBack();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.isAdding) {
      this.slideBack();
    }
  }
}
