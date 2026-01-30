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

// ============================================================================
// User Deactivation DTOs - mirrors backend DeactivateUserDtos.cs
// ============================================================================

/**
 * Request body for deactivating a user
 */
export interface DeactivateUserRequest {
  /** If true, bypasses soft warnings but not hard blocks */
  force: boolean;
}

/**
 * Soft warnings that require admin confirmation before user deactivation.
 * Returned with HTTP 409 Conflict.
 */
export interface DeactivateUserWarnings {
  code: 'DEACTIVATE_USER_WARNINGS';
  /** User's current points balance (warning if > 0) */
  pointsBalance: number;
  /** Count of completed events user participated in */
  completedEventsCount: number;
  /** Count of completed redemptions (fulfilled/delivered) */
  completedRedemptionsCount: number;
  /** User's last activity timestamp (based on recent transactions) */
  lastActivityDate?: string;
  /** Number of days since last activity */
  daysSinceLastActivity?: number;
  /** Human-readable message for the UI */
  message: string;
}

/**
 * Hard block preventing user deactivation.
 * Returned with HTTP 422 Unprocessable Entity.
 */
export interface DeactivateUserBlocked {
  code: 'DEACTIVATE_USER_BLOCKED';
  /** Count of pending redemptions (cannot deactivate) */
  pendingRedemptionsCount: number;
  /** Count of approved (ready for pickup) redemptions (cannot deactivate) */
  approvedRedemptionsCount: number;
  /** Count of active event registrations (Draft/Active events) */
  activeEventRegistrationsCount: number;
  /** True if target user is an Admin */
  targetIsAdmin: boolean;
  /** True if admin is trying to deactivate themselves */
  selfDeactivation: boolean;
  /** List of specific reasons for the block */
  reasons: string[];
  /** Human-readable message for the UI */
  message: string;
}

/**
 * Data for user deactivation warning dialog
 */
export interface DeactivateUserWarningData {
  userName: string;
  userId: string;
  pointsBalance: number;
  completedEventsCount: number;
  completedRedemptionsCount: number;
  lastActivityDate?: string;
  daysSinceLastActivity?: number;
}

