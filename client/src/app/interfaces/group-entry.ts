export interface GroupEntry {
  id: string;
  text: string;
  groupId: string;
  created: string;
}

export interface CreateGroupEntryPayload {
  text: string;
  group_id: string;
}
