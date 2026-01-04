import { Routes } from '@angular/router';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { ListGroupEntriesComponent } from './components/list-group-entries/list-group-entries.component';

export const routes: Routes = [
  { path: '', redirectTo: 'groups', pathMatch: 'full' },
  { path: 'groups', component: MainContainerComponent },
  { path: 'groups/:groupId', component: ListGroupEntriesComponent },
  { path: '**', redirectTo: 'groups' },
];
