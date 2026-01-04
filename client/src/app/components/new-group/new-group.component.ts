import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroupsService } from '../../services/groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-group',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-group.component.html',
  styleUrl: './new-group.component.scss',
})
export class NewGroupComponent {
  private readonly groupsService = inject(GroupsService);
  private readonly router = inject(Router);

  title = '';
  description = '';
  color = '#ffffffff';
  iconUrl: string | null = null;
  iconFile: File | null = null;

  titleExists = (title: string) => this.groupsService.titleAlreadyExists(title);

  createGroup() {
    this.groupsService.add({
      title: this.title,
      description: this.description,
      color: this.color,
      iconFile: this.iconFile,
    });

    this.cleanup();
    this.router.navigate(['/groups']);
  }

  onCancel() {
    this.cleanup();
    this.router.navigate(['/groups']);
  }

  cleanup() {
    if (this.iconUrl) {
      URL.revokeObjectURL(this.iconUrl);
    }

    this.title = '';
    this.description = '';
    this.color = '#ffffffff';
    this.iconUrl = null;
    this.iconFile = null;
  }

  onIconSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    // revoke previous preview
    if (this.iconUrl) {
      URL.revokeObjectURL(this.iconUrl);
      this.iconUrl = null;
    }

    if (!file) {
      this.iconUrl = null;
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.iconUrl = null;
      return;
    }

    this.iconFile = file;
    this.iconUrl = URL.createObjectURL(file);
  }
}
