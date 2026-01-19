/**
 * User-related models and interfaces
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  roles: string[];
  isActive: boolean;
  lastActive?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserWithDetails extends User {
  points: UserPoints;
  transactionCount: number;
}

export interface UserPoints {
  current: number;
  earned: number;
  redeemed: number;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  totalPoints: number;
  pendingRedemptions: number;
}

export interface AdjustPointsRequest {
  userId: string;
  amount: number;
  reason: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  roles: string[];
  groupId?: string;
  isActive: boolean;
  initialPoints?: number;
  sendPasswordEmail: boolean;
  temporaryPassword?: string;
  adminNotes?: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  roles?: string[];
}

export interface ActivateUserRequest {
  userId: string;
}

export interface DeactivateUserRequest {
  userId: string;
}

export interface DeleteUserRequest {
  userId: string;
}

export interface UserListResponse {
  count: number;
  users: User[];
  activeOnly?: boolean;
}

export interface UserDetailsResponse {
  user: UserWithDetails;
}

export interface StatsDto {
  totalUsers: number;
  totalPointsEarned: number;
  totalPointsRedeemed: number;
  pendingRedemptions: number;
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UserFilterCriteria {
  search?: string;
  status?: 'active' | 'inactive';
  role?: string;
  balanceMin?: number;
  balanceMax?: number;
}

export interface UserTableRow extends User {
  balance: number;
  earned: number;
  redeemed: number;
  lastActive?: string;
}
