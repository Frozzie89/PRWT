import { Component } from '@angular/core';
import { ListGroupComponent } from '../list-group/list-group.component';
import { NewGroupComponent } from '../new-group/new-group.component';

@Component({
  selector: 'app-main-container',
  imports: [ListGroupComponent, NewGroupComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
})
export class MainContainerComponent {
  isAdding = false;

  openAdd() {
    this.isAdding = true;
  }
  closeAdd() {
    this.isAdding = false;
  }
}
