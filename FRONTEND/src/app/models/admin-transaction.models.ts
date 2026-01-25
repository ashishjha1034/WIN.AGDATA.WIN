/**
 * Admin Transaction Models
 * TypeScript interfaces for transaction audit/management features
 */

// Transaction types enum matching backend
export enum TransactionType {
  Earned = 'Earned',
  Redeemed = 'Redeemed',
  Adjusted = 'Adjusted',
  Refunded = 'Refunded'
}

// Source types for filtering
export type TransactionSource = 'Event' | 'Product' | 'Admin' | 'System';

/**
 * Admin transaction DTO with full user details
 */
export interface AdminTransaction {
  id: string;
  amount: number;
  type: string;
  timestamp: string;
  description: string;
  source: string;
  sourceId: string | null;
  balanceAfter: number;
  processedBy: string | null;
  processedByName: string | null;
  userId: string;
  userName: string;
  userEmail: string;
  employeeId: string | null;
}

/**
 * Filter request for admin transactions
 */
export interface TransactionFilterRequest {
  pageNumber: number;
  pageSize: number;
  userId?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  source?: string;
  searchQuery?: string;
  sortBy?: string;
  sortDescending?: boolean;
}

/**
 * Pagination info
 */
export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Transaction summary statistics
 */
export interface TransactionSummary {
  totalEarned: number;
  totalRedeemed: number;
  totalAdjusted: number;
  transactionCount: number;
  netPoints: number;
}

/**
 * Paginated transaction response
 */
export interface PagedTransactionResponse {
  data: AdminTransaction[];
  pagination: PaginationInfo;
  summary: TransactionSummary;
}

/**
 * Monthly chart data point
 */
export interface MonthlyChartDataPoint {
  month: number;
  year: number;
  monthName: string;
  pointsEarned: number;
  pointsRedeemed: number;
  netPoints: number;
}

/**
 * Points chart response
 */
export interface PointsChartResponse {
  months: number;
  data: MonthlyChartDataPoint[];
}

/**
 * Adjust points request
 */
export interface AdjustPointsRequest {
  userId: string;
  amount: number;
  reason: string;
}

/**
 * Adjust points response
 */
export interface AdjustPointsResponse {
  message: string;
  userId: string;
  amount: number;
  reason: string;
}

/**
 * User option for filters
 */
export interface UserOption {
  id: string;
  name: string;
  email: string;
  employeeId: string;
}

/**
 * Transaction detail with computed fields
 */
export interface TransactionDetail extends AdminTransaction {
  balanceBefore: number;
  formattedDate: string;
  formattedTime: string;
}
