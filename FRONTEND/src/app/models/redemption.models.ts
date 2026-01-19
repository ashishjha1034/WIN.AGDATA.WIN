export enum RedemptionStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Delivered = 3,
  Cancelled = 4
}

export interface Redemption {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  productId: string;
  productName: string;
  productCategory: string;
  pointsSpent: number;
  quantity: number;
  status: RedemptionStatus;
  adminNotes?: string;
  createdAt: string;
  approvedAt?: string;
  deliveredAt?: string;
}

export interface RedemptionDetail {
  id: string;
  
  // Redemption info
  pointsSpent: number;
  quantity: number;
  status: RedemptionStatus;
  adminNotes?: string;
  createdAt: string;
  
  // Approval/Delivery info
  approvedBy?: string;
  approvedAt?: string;
  deliveredBy?: string;
  deliveredAt?: string;
  
  // User snapshot
  userId: string;
  userName: string;
  userEmail: string;
  userAvatarUrl: string;
  userCurrentBalance: number;
  userTotalEarned: number;
  userTotalRedeemed: number;
  
  // Product snapshot
  productId: string;
  productName: string;
  productDescription: string;
  productCategory: string;
  productImageUrl: string;
  productPointsPerUnit: number;
  productTotalPoints: number;
}

export interface RedemptionListResponse {
  items: Redemption[];
  counts: {
    pending: number;
    approved: number;
    delivered: number;
    rejected: number;
    cancelled: number;
  };
}

export interface ApproveRedemptionRequest {
  approvedBy: string;
  notes?: string;
}

export interface RejectRedemptionRequest {
  rejectedBy: string;
  reason: string;
}

export interface DeliverRedemptionRequest {
  deliveredBy: string;
  notes?: string;
}

export interface RedemptionActionResponse {
  message: string;
  redemptionId: string;
  status: string;
  reason?: string;
}
