/**
 * Group-related models and interfaces
 */

export interface Group {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  adminCount?: number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface GroupMember {
  userId: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  roleInGroup: 'Member' | 'Lead';
  isActive: boolean;
  joinedAt?: string;
}

export interface GroupDetails extends Group {
  members: GroupMember[];
  totalMembers: number;
}

export interface GroupListResponse {
  count: number;
  groups: Group[];
}

export interface GroupDetailsResponse {
  group: GroupDetails;
}

export interface AddMembersToGroupRequest {
  groupId: string;
  userIds: string[];
  roles?: { [userId: string]: 'Member' | 'Lead' };
}

export interface CreateGroupRequest {
  name: string;
  description?: string;
}

export interface UpdateGroupRequest {
  name?: string;
  description?: string;
}

export interface RemoveGroupMemberRequest {
  groupId: string;
  userId: string;
}

export interface GroupPaginationOptions {
  page: number;
  pageSize: number;
  search?: string;
}

export interface GroupFilterCriteria {
  search?: string;
}
