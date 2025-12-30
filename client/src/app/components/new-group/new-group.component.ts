import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ListGroupItem } from '../../interfaces/list-group-item';
import { FormsModule } from '@angular/forms';
import { GroupsService } from '../../service/groups.service';

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

  groupsService = inject(GroupsService);

  title: string = '';
  description: string = '';
  color: string = '#ffffffff';
  icon: any;

  titleExists = (title: string) => this.groupsService.titleAlreadyExists(title);

  createGroup() {
    this.create.emit({
      title: this.title,
      description: this.description,
      color: this.color,
      icon: this.icon,
    });
  }

  onIconSelected($event: Event) {
    this.icon = ($event.target as HTMLInputElement).value;
  }
}
