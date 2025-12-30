import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListGroupComponent } from './components/list-group/list-group.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListGroupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
}
