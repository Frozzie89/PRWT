import { Routes } from '@angular/router';
import { ListGroupsComponent } from './components/list-groups/list-groups.component';
import { ListGroupEntriesComponent } from './components/list-group-entries/list-group-entries.component';
import { NewGroupComponent } from './components/new-group/new-group.component';

export const routes: Routes = [
  { path: '', redirectTo: 'groups', pathMatch: 'full' },
  { path: 'groups', component: ListGroupsComponent },
  { path: 'groups/new', component: NewGroupComponent },
  { path: 'groups/:groupId', component: ListGroupEntriesComponent },
  { path: '**', redirectTo: 'groups' },
];
