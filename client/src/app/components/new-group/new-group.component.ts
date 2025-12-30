import { Component, EventEmitter, Output } from '@angular/core';
import { ListGroupItem } from '../../interfaces/list-group-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-group',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-group.component.html',
  styleUrl: './new-group.component.scss',
})
export class NewGroupComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() create = new EventEmitter<ListGroupItem>();

  name: string = '';
  description: string = '';
  color: string = '#ffffffff';
  icon: any;

  createGroup() {
    throw new Error('Method not implemented.');
  }

  onIconSelected($event: Event) {
    throw new Error('Method not implemented.');
  }
}
