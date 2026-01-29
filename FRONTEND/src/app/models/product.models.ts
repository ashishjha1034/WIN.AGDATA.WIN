/**
 * Product-related models and interfaces
 * Used for Product Management admin module
 */

export interface Product {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  categoryName: string;
  pointsCost: number;
  imageUrl?: string;
  stockLevel: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductDetail extends Product {
  reservedStock?: number;
  availableStock?: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
}

export interface ProductKPI {
  totalActiveProducts: number;
  lowStockProducts: number;
  inactiveProducts: number;
  totalRedeemablePoints: number;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  categoryId: string;
  pointsCost: number;
  imageUrl?: string;
  initialStock?: number;
  isActive?: boolean;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  categoryId?: string;
  pointsCost?: number;
  imageUrl?: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  displayOrder?: number;
}

export interface UpdateStockRequest {
  amount: number;
  operation: 'increase' | 'decrease' | 'adjust';
  reason?: string;
}

export interface ProductListResponse {
  count: number;
  data: Product[];
  categoryId?: string;
}

export interface ProductDetailResponse {
  data: ProductDetail;
}

export interface CategoriesResponse {
  count: number;
  data: ProductCategory[];
}

export interface ProductFilter {
  categoryIds?: string[];
  status?: 'active' | 'inactive' | 'all';
  stockLevel?: 'low' | 'out' | 'unlimited' | 'all';
  minPoints?: number;
  maxPoints?: number;
  searchText?: string;
}

export interface ProductRedemption {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  quantity: number;
  pointsSpent: number;
  status: number;  // Using numeric status from backend
  statusText: string; // Human-readable status text
  requestDate: string;  // renamed from createdAt
  approvedDate?: string;
  deliveredDate?: string;
  adminNotes?: string;
}

export enum RedemptionStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Delivered = 3,
  Cancelled = 4
}

export interface ProductRedemptionsResponse {
  count: number;
  data: ProductRedemption[];
}

export interface StockAdjustment {
  productId: string;
  amount: number;
  operation: 'increase' | 'decrease' | 'adjust';
  reason?: string;
  newStock?: number;
}

export interface LowStockProduct {
  id: string;
  name: string;
  description?: string;
  category: string;
  currentStock: number;
  reserved: number;
  price: number;
  isActive: boolean;
}

export interface LowStockResponse {
  count: number;
  threshold: number;
  data: LowStockProduct[];
}

/**
 * Request body for deactivating a product
 */
export interface DeactivateProductRequest {
  /** If true, bypasses soft warnings (stock > 0, recent demand) but not hard blocks */
  force: boolean;
}

/**
 * Soft warnings that require admin confirmation before deactivation.
 * Returned with HTTP 409 Conflict.
 */
export interface DeactivateProductWarnings {
  code: 'DEACTIVATE_WARNINGS';
  stock: number;
  recentRedemptions7d: number;
  recentUniqueUsers7d: number;
  recentRedemptions30d?: number;
  recentUniqueUsers30d?: number;
  lastRedemptionDate?: string;
  message: string;
}

/**
 * Hard block preventing deactivation due to active redemptions.
 * Returned with HTTP 400 Bad Request.
 */
export interface DeactivateProductBlocked {
  code: 'DEACTIVATE_BLOCKED';
  pending: number;
  approved: number;
  message: string;
}

/**
 * Result type for deactivation response handling
 */
export type DeactivateProductResponse = 
  | { success: true; message: string }
  | DeactivateProductWarnings 
  | DeactivateProductBlocked;
