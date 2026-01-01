import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ListGroupItem } from '../../interfaces/list-group-item';
import { FormsModule } from '@angular/forms';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-new-group',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-group.component.html',
  styleUrl: './new-group.component.scss',
})
export class NewGroupComponent {
  @Output() dismiss = new EventEmitter<void>();
  @Output() create = new EventEmitter<ListGroupItem>();

  groupsService = inject(GroupsService);

  title = '';
  description = '';
  color = '#ffffffff';
  icon: string | null = null;

  private iconObjectUrl: string | null = null;

  titleExists = (title: string) => this.groupsService.titleAlreadyExists(title);

  createGroup() {
    this.create.emit({
      title: this.title,
      description: this.description,
      color: this.color,
      icon: this.icon ?? '',
    });

    this.cleanup();
  }

  onCancel() {
    this.dismiss.emit();
    this.cleanup();
  }

  cleanup() {
    if (this.iconObjectUrl) {
      URL.revokeObjectURL(this.iconObjectUrl);
      this.iconObjectUrl = null;
    }

    this.icon = null;
    this.title = '';
    this.description = '';
    this.color = '#ffffffff';
  }

  onIconSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    // cleanup previous URL
    if (this.iconObjectUrl) {
      URL.revokeObjectURL(this.iconObjectUrl);
      this.iconObjectUrl = null;
    }

    if (!file) {
      this.icon = null;
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.icon = null;
      return;
    }

    this.iconObjectUrl = URL.createObjectURL(file);
    this.icon = this.iconObjectUrl;
  }
}
