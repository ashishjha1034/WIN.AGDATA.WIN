/**
 * User-related models and interfaces
 * Aligned with backend API contracts
 */

// Matches the nested points object from API
export interface UserPoints {
  current: number;
  earned: number;
  redeemed: number;
}

// Base user from API response - matches backend UserDto
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  roles: string[];
  isActive: boolean;
  mustChangePassword?: boolean;
  currentBalance?: number;
  totalEarned?: number;
  totalRedeemed?: number;
  // Points from nested API response (admin/users endpoint)
  points?: UserPoints;
  createdAt?: string;
  updatedAt?: string;
}

// User with full details from GET /admin/users/{id}
export interface UserWithDetails {
  user: User;
  points: UserPoints;
  transactionCount: number;
}

// Stats from GET /admin/stats
export interface StatsDto {
  totalUsers: number;
  totalPointsEarned: number;
  totalPointsRedeemed: number;
  pendingRedemptions: number;
}

// Request to invite/create a user - matches backend InviteUserRequest
export interface InviteUserRequest {
  employeeId: string;
  email: string;
  firstName: string;
  lastName: string;
  roles?: string[];
  generateTempPassword?: boolean;
  temporaryPassword?: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  employeeId?: string | null;
}

// Response from GET /admin/users
export interface UserListResponse {
  count: number;
  activeOnly: boolean;
  users: UserListItem[];
}

// Individual user item from list response
export interface UserListItem {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  isActive: boolean;
  points: UserPoints;
  roles: string[];
}

// Response from GET /admin/users/{id}
export interface UserDetailsResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    employeeId: string;
    isActive: boolean;
    roles: string[];
  };
  points: UserPoints;
  transactionCount: number;
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
  balanceRange?: '0-1000' | '1000-5000' | '5000+';
}
