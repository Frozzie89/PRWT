import { Component } from '@angular/core';
import { ListGroup } from '../../types/list-group';

@Component({
  selector: 'app-list-group',
  imports: [],
  templateUrl: './list-group.component.html',
  styleUrl: './list-group.component.scss',
})
export class ListGroupComponent {
  // placeholder data
  listGroup: ListGroup = {
    items: [
      {
        title: 'Item 1',
        description: 'Description for Item 1',
      },
      {
        title: 'Item 2',
        description: 'Description for Item 2',
      },
      {
        title: 'Item 3',
        description: 'Description for Item 3',
      },
    ],
  };
}
