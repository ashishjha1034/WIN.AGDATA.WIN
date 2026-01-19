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

export interface UpdateStockRequest {
  amount: number;
  operation: 'increase' | 'decrease' | 'adjust';
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
  quantity: number;
  pointsSpent: number;
  status: RedemptionStatus;
  adminNotes?: string;
  createdAt: string;
}

export enum RedemptionStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Delivered = 'Delivered',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled'
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
