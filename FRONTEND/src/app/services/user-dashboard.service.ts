import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';

export interface UserDashboardStats {
  currentBalance: number;
  pointsEarned: number;
  pointsRedeemed: number;
  eventsRegistered: number;
}

export interface TopProduct {
  id: string;
  name: string;
  imageUrl?: string;
  categoryName: string;
  pointsCost: number;
}

export interface UserTransaction {
  id: string;
  type: string;
  description: string;
  points: number;
  amount?: number;
  source?: string;
  sourceId?: string | null;
  balanceAfter?: number;
  processedBy?: string | null;
  createdAt: string;
  timestamp?: string;
}

export interface UserEvent {
  id: string;
  name: string;
  eventDate: string;
  location: string;
  status: string;
  registrationStatus?: string;
  spotsLeft?: number;
  participantCount?: number;
}

export interface UserProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryId?: string;
  price: number;
  pointsCost: number;
  imageUrl?: string;
  currentStock: number;
  isActive: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
}

export interface UserRedemption {
  id: string;
  productId: string;
  productName: string;
  productDescription?: string;
  productCategory?: string;
  productImageUrl?: string;
  productPointsPerUnit: number;
  quantity: number;
  pointsSpent: number;
  status: string;
  statusCode: number;
  adminNotes?: string;
  createdAt: string;
  approvedAt?: string;
  deliveredAt?: string;
  userCurrentBalance?: number;
}

export interface RedemptionStatusCounts {
  pending: number;
  approved: number;
  delivered: number;
  rejected: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {
  private readonly API_URL = API_CONFIG.getApiUrl();

  constructor(private http: HttpClient) { }

  /**
   * Fetch user dashboard statistics
   * Uses /api/transaction/statistics endpoint
   */
  getUserStats(): Observable<UserDashboardStats> {
    const url = `${this.API_URL}/transaction/statistics`;
    console.log('Fetching user dashboard stats from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('User stats response:', response);
        // Handle nested response structure: response.user contains the data
        const user = response.user || response;
        const userStats = response.userStats || {};
        
        return {
          currentBalance: user.currentBalance ?? user.CurrentBalance ?? 0,
          pointsEarned: user.totalEarned ?? user.TotalEarned ?? 0,
          pointsRedeemed: user.totalRedeemed ?? user.TotalRedeemed ?? 0,
          eventsRegistered: userStats.eventParticipationCount ?? userStats.EventParticipationCount ?? 0
        } as UserDashboardStats;
      }),
      catchError(error => {
        console.error('Error fetching user stats:', error);
        return of({
          currentBalance: 0,
          pointsEarned: 0,
          pointsRedeemed: 0,
          eventsRegistered: 0
        } as UserDashboardStats);
      })
    );
  }

  /**
   * Fetch recent transactions for the current user
   * Uses /api/transaction/my-history endpoint
   * NOTE: Backend DTO uses 'Amount' which serializes to 'amount' in JSON
   */
  getRecentTransactions(limit: number = 5): Observable<UserTransaction[]> {
    const url = `${this.API_URL}/transaction/my-history?pageNumber=1&pageSize=${limit}`;
    console.log('Fetching recent transactions from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Transactions response:', response);
        const transactions = response.data || [];
        return transactions.map((t: any) => {
          // Backend TransactionDto.Amount -> JSON 'amount'
          const pointsValue = t.amount ?? t.Amount ?? t.points ?? t.Points ?? 0;
          return {
            id: t.id,
            type: t.type || t.Type || 'Transaction',
            description: t.description || t.Description || t.type || t.Type,
            points: pointsValue,
            amount: pointsValue,
            source: t.source || t.Source || '',
            sourceId: t.sourceId || t.SourceId || null,
            balanceAfter: t.balanceAfter ?? t.BalanceAfter ?? 0,
            processedBy: t.processedBy || t.ProcessedBy || null,
            createdAt: t.timestamp || t.Timestamp || t.createdAt || t.CreatedAt,
            timestamp: t.timestamp || t.Timestamp || t.createdAt || t.CreatedAt
          };
        });
      }),
      catchError(error => {
        console.error('Error fetching recent transactions:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetch all transactions for the current user
   */
  getAllTransactions(): Observable<UserTransaction[]> {
    const url = `${this.API_URL}/transaction/my-history?pageNumber=1&pageSize=100`;
    console.log('Fetching all transactions from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        const transactions = response.data || [];
        return transactions.map((t: any) => ({
          id: t.id,
          type: t.type || t.Type || 'Transaction',
          description: t.description || t.Description || t.type || t.Type,
          points: t.amount ?? t.Amount ?? t.points ?? t.Points ?? 0,
          amount: t.amount ?? t.Amount ?? t.points ?? t.Points ?? 0,
          source: t.source || t.Source || '',
          sourceId: t.sourceId || t.SourceId || null,
          balanceAfter: t.balanceAfter ?? t.BalanceAfter ?? 0,
          processedBy: t.processedBy || t.ProcessedBy || null,
          createdAt: t.timestamp || t.Timestamp || t.createdAt || t.CreatedAt,
          timestamp: t.timestamp || t.Timestamp || t.createdAt || t.CreatedAt
        }));
      }),
      catchError(error => {
        console.error('Error fetching all transactions:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetch upcoming events
   * Uses /api/event endpoint and filters by status "Upcoming" (mapped from Draft in backend)
   * Also fetches user's registered events to show registration status
   */
  getUpcomingEvents(limit: number = 3): Observable<UserEvent[]> {
    const url = `${this.API_URL}/event`;
    console.log('Fetching events from:', url);
    
    return forkJoin({
      events: this.http.get<any>(url),
      myEvents: this.http.get<any>(`${this.API_URL}/event/user/my-events`).pipe(
        catchError(() => of({ data: [] }))
      )
    }).pipe(
      map(({ events, myEvents }) => {
        console.log('Events response:', events);
        const allEvents = events.data || [];
        const myEventIds = new Set(
          (Array.isArray(myEvents) ? myEvents : myEvents.data || [])
            .map((e: any) => e.id)
        );
        
        // Filter by status "Upcoming" (mapped from EventStatus.Draft in backend via EventProfile)
        // Also include events with future dates as fallback
        const now = new Date();
        const upcomingEvents = allEvents
          .filter((e: any) => {
            const status = (e.status || e.Status || '').toLowerCase();
            const eventDate = new Date(e.eventDate || e.EventDate);
            // Status "Upcoming" is the display label for Draft events
            return status === 'upcoming' || (status === 'draft' && eventDate >= now);
          })
          .slice(0, limit)
          .map((e: any) => ({
            id: e.id,
            name: e.name || e.Name,
            eventDate: e.eventDate || e.EventDate,
            location: e.location || e.Location || '',
            status: e.status || e.Status || 'Upcoming',
            participantCount: e.participantCount || e.ParticipantCount || 0,
            spotsLeft: e.maxParticipants ? (e.maxParticipants - (e.participantCount || 0)) : undefined,
            registrationStatus: myEventIds.has(e.id) ? 'Registered' : undefined
          }));
        
        return upcomingEvents;
      }),
      catchError(error => {
        console.error('Error fetching upcoming events:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetch all events
   */
  getAllEvents(): Observable<UserEvent[]> {
    const url = `${this.API_URL}/event`;
    console.log('Fetching all events from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        const events = response.data || [];
        return events.map((e: any) => ({
          id: e.id,
          name: e.name || e.Name,
          eventDate: e.eventDate || e.EventDate,
          location: e.location || e.Location || '',
          status: e.status || e.Status || 'Active',
          participantCount: e.participantCount || e.ParticipantCount || 0
        }));
      }),
      catchError(error => {
        console.error('Error fetching all events:', error);
        return of([]);
      })
    );
  }

  /**
   * Register for an event
   */
  registerForEvent(eventId: string): Observable<any> {
    const url = `${this.API_URL}/event/${eventId}/participate`;
    console.log('Registering for event:', url);
    return this.http.post<any>(url, {});
  }

  /**
   * Fetch available products
   * Uses /api/products endpoint
   */
  getProducts(): Observable<UserProduct[]> {
    const url = `${this.API_URL}/products`;
    console.log('Fetching products from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Products response:', response);
        const products = response.data || [];
        return products.map((p: any) => ({
          id: p.id,
          name: p.name || p.Name,
          description: p.description || p.Description || '',
          category: p.categoryName || p.CategoryName || '',
          categoryId: p.categoryId || p.CategoryId || '',
          price: p.price ?? p.Price ?? 0,
          pointsCost: p.pointsCost ?? p.PointsCost ?? p.price ?? p.Price ?? 0,
          imageUrl: p.imageUrl || p.ImageUrl,
          currentStock: p.stockLevel ?? p.StockLevel ?? 0,
          isActive: p.isActive ?? p.IsActive ?? true
        }));
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetch product categories
   */
  getProductCategories(): Observable<ProductCategory[]> {
    const url = `${this.API_URL}/products/categories/all`;
    console.log('Fetching product categories from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Categories response:', response);
        const categories = response.data || response || [];
        return categories.map((c: any) => ({
          id: c.id || c.Id,
          name: c.name || c.Name,
          description: c.description || c.Description
        }));
      }),
      catchError(error => {
        console.error('Error fetching product categories:', error);
        return of([]);
      })
    );
  }

  /**
   * Get current user's points balance
   */
  getUserPoints(): Observable<number> {
    return this.getUserStats().pipe(
      map(stats => stats.currentBalance)
    );
  }

  /**
   * Create a redemption request
   */
  createRedemption(productId: string, quantity: number): Observable<any> {
    const url = `${this.API_URL}/redemptions`;
    console.log('Creating redemption:', url, { productId, quantity });
    return this.http.post<any>(url, { productId, quantity });
  }

  /**
   * Get product IDs with pending or approved redemptions
   * Users cannot redeem a product again until the previous redemption is delivered
   */
  getPendingRedemptionProductIds(): Observable<string[]> {
    const url = `${this.API_URL}/redemptions/pending-products`;
    console.log('Fetching pending redemption product IDs from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Pending products response:', response);
        return response.productIds || [];
      }),
      catchError(error => {
        console.error('Error fetching pending products:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetch product details
   */
  getProductDetails(productId: string): Observable<UserProduct> {
    const url = `${this.API_URL}/products/${productId}`;
    console.log('Fetching product details from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        const p = response.data || response;
        return {
          id: p.id,
          name: p.name || p.Name,
          description: p.description || p.Description || '',
          category: p.categoryName || p.CategoryName || '',
          categoryId: p.categoryId || p.CategoryId || '',
          price: p.price ?? p.Price ?? 0,
          pointsCost: p.pointsCost ?? p.PointsCost ?? p.price ?? p.Price ?? 0,
          imageUrl: p.imageUrl || p.ImageUrl,
          currentStock: p.stockLevel ?? p.StockLevel ?? 0,
          isActive: p.isActive ?? p.IsActive ?? true
        };
      })
    );
  }

  /**
   * Redeem a product
   */
  redeemProduct(productId: string, quantity: number): Observable<any> {
    const url = `${this.API_URL}/redemptions`;
    console.log('Redeeming product:', url);
    return this.http.post<any>(url, { productId, quantity });
  }

  /**
   * Fetch user redemptions
   * Uses /api/redemptions/my-redemptions endpoint
   */
  getRedemptions(): Observable<UserRedemption[]> {
    const url = `${this.API_URL}/redemptions/my-redemptions`;
    console.log('Fetching redemptions from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Redemptions response:', response);
        const redemptions = response.data || [];
        return redemptions.map((r: any) => {
          const statusCode = this.parseRedemptionStatus(r.status || r.Status);
          return {
            id: r.id,
            productId: r.productId || r.ProductId,
            productName: r.productName || r.ProductName || 'Product',
            productDescription: r.productDescription || r.ProductDescription || '',
            productCategory: r.productCategory || r.ProductCategory || '',
            productImageUrl: r.productImageUrl || r.ProductImageUrl || '',
            productPointsPerUnit: r.productPointsPerUnit || r.ProductPointsPerUnit || Math.round((r.pointsSpent || r.PointsSpent || 0) / (r.quantity || r.Quantity || 1)),
            quantity: r.quantity ?? r.Quantity ?? 1,
            pointsSpent: r.pointsSpent ?? r.PointsSpent ?? 0,
            status: this.getStatusLabel(statusCode),
            statusCode: statusCode,
            adminNotes: r.adminNotes || r.AdminNotes || null,
            createdAt: r.createdAt || r.CreatedAt,
            approvedAt: r.approvedAt || r.ApprovedAt,
            deliveredAt: r.deliveredAt || r.DeliveredAt,
            userCurrentBalance: r.userCurrentBalance || r.UserCurrentBalance
          };
        });
      }),
      catchError(error => {
        console.error('Error fetching redemptions:', error);
        return of([]);
      })
    );
  }

  /**
   * Parse redemption status from API response
   */
  private parseRedemptionStatus(status: any): number {
    if (typeof status === 'number') return status;
    if (typeof status === 'string') {
      const statusLower = status.toLowerCase();
      if (statusLower === 'pending' || status === '0') return 0;
      if (statusLower === 'approved' || status === '1') return 1;
      if (statusLower === 'rejected' || status === '2') return 2;
      if (statusLower === 'delivered' || status === '3') return 3;
      if (statusLower === 'cancelled' || status === '4') return 4;
    }
    return 0;
  }

  /**
   * Get status label from status code
   */
  private getStatusLabel(statusCode: number): string {
    switch (statusCode) {
      case 0: return 'Pending';
      case 1: return 'Approved';
      case 2: return 'Rejected';
      case 3: return 'Delivered';
      case 4: return 'Cancelled';
      default: return 'Pending';
    }
  }

  /**
   * Fetch redemption status counts
   * Calculates from user's redemptions
   */
  getRedemptionStatusCounts(): Observable<RedemptionStatusCounts> {
    return this.getRedemptions().pipe(
      map(redemptions => {
        const counts = {
          pending: 0,
          approved: 0,
          delivered: 0,
          rejected: 0
        };
        
        redemptions.forEach(r => {
          const statusCode = r.statusCode;
          if (statusCode === 0) {
            counts.pending++;
          } else if (statusCode === 1) {
            counts.approved++;
          } else if (statusCode === 2) {
            counts.rejected++;
          } else if (statusCode === 3) {
            counts.delivered++;
          }
        });
        
        console.log('Redemption counts:', counts);
        return counts;
      }),
      catchError(error => {
        console.error('Error calculating redemption counts:', error);
        return of({ pending: 0, approved: 0, delivered: 0, rejected: 0 });
      })
    );
  }

  /**
   * Fetch top products for carousel
   * Uses the products endpoint and returns active products sorted by popularity
   * Falls back to products with images for the carousel display
   */
  getTopProducts(limit: number = 10): Observable<TopProduct[]> {
    const url = `${this.API_URL}/products`;
    console.log('Fetching top products from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Products response for carousel:', response);
        const products = response.data || [];
        
        // Filter active products and sort by those with images first, then by stock
        const topProducts = products
          .filter((p: any) => p.isActive ?? p.IsActive ?? true)
          .sort((a: any, b: any) => {
            // Prefer products with images
            const aHasImage = !!(a.imageUrl || a.ImageUrl);
            const bHasImage = !!(b.imageUrl || b.ImageUrl);
            if (aHasImage && !bHasImage) return -1;
            if (!aHasImage && bHasImage) return 1;
            // Then by stock level (higher stock first)
            return (b.stockLevel ?? b.StockLevel ?? 0) - (a.stockLevel ?? a.StockLevel ?? 0);
          })
          .slice(0, limit)
          .map((p: any) => ({
            id: p.id,
            name: p.name || p.Name,
            imageUrl: p.imageUrl || p.ImageUrl,
            categoryName: p.categoryName || p.CategoryName || 'General',
            pointsCost: p.pointsCost ?? p.PointsCost ?? p.price ?? p.Price ?? 0
          }));
        
        return topProducts;
      }),
      catchError(error => {
        console.error('Error fetching top products:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetch complete dashboard data
   */
  getDashboardData(): Observable<any> {
    // This would combine multiple endpoints
    console.log('Fetching complete user dashboard data');
    return this.http.get<any>(`${this.API_URL}/users/me`);
  }
}
