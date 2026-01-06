import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Group } from '../interfaces/group';
import { GroupsService } from '../services/groups.service';

export const groupResolver: ResolveFn<Group> = async (route: ActivatedRouteSnapshot) => {
  const groupsService = inject(GroupsService);
  const router = inject(Router);

  const groupId = route.paramMap.get('groupId');
  if (!groupId) {
    router.navigate(['/groups']);
    throw new Error('Missing groupId route param');
  }

  const group = await groupsService.getById(groupId);

  if (!group) {
    router.navigate(['/groups']);
    throw new Error(`Group not found: ${groupId}`);
  }

  return group;
};
