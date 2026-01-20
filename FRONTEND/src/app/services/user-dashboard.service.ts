import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';

export interface UserDashboardStats {
  currentBalance: number;
  pointsEarned: number;
  pointsRedeemed: number;
  eventsRegistered: number;
}

export interface UserTransaction {
  id: string;
  type: string;
  description: string;
  points: number;
  createdAt: string;
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
  price: number;
  imageUrl?: string;
  currentStock: number;
  isActive: boolean;
}

export interface UserRedemption {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  pointsSpent: number;
  status: string;
  createdAt: string;
  approvedAt?: string;
  deliveredAt?: string;
}

export interface RedemptionStatusCounts {
  pending: number;
  approved: number;
  delivered: number;
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
   */
  getRecentTransactions(limit: number = 5): Observable<UserTransaction[]> {
    const url = `${this.API_URL}/transaction/my-history?pageNumber=1&pageSize=${limit}`;
    console.log('Fetching recent transactions from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Transactions response:', response);
        const transactions = response.data || [];
        return transactions.map((t: any) => ({
          id: t.id,
          type: t.type || t.Type || 'Transaction',
          description: t.description || t.Description || t.type || t.Type,
          points: t.points ?? t.Points ?? 0,
          createdAt: t.createdAt || t.CreatedAt
        }));
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
          points: t.points ?? t.Points ?? 0,
          createdAt: t.createdAt || t.CreatedAt
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
   * Uses /api/event endpoint and filters upcoming events
   */
  getUpcomingEvents(limit: number = 3): Observable<UserEvent[]> {
    const url = `${this.API_URL}/event`;
    console.log('Fetching events from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Events response:', response);
        const events = response.data || [];
        const now = new Date();
        
        // Filter upcoming events and take only the limit
        const upcomingEvents = events
          .filter((e: any) => new Date(e.eventDate || e.EventDate) >= now)
          .slice(0, limit)
          .map((e: any) => ({
            id: e.id,
            name: e.name || e.Name,
            eventDate: e.eventDate || e.EventDate,
            location: e.location || e.Location || '',
            status: e.status || e.Status || 'Active',
            participantCount: e.participantCount || e.ParticipantCount || 0,
            spotsLeft: e.maxParticipants ? (e.maxParticipants - (e.participantCount || 0)) : undefined
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
          category: p.category || p.Category || '',
          price: p.price ?? p.Price ?? 0,
          imageUrl: p.imageUrl || p.ImageUrl,
          currentStock: p.currentStock ?? p.CurrentStock ?? 0,
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
          category: p.category || p.Category || '',
          price: p.price ?? p.Price ?? 0,
          imageUrl: p.imageUrl || p.ImageUrl,
          currentStock: p.currentStock ?? p.CurrentStock ?? 0,
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
        return redemptions.map((r: any) => ({
          id: r.id,
          productId: r.productId || r.ProductId,
          productName: r.productName || r.ProductName || 'Product',
          quantity: r.quantity ?? r.Quantity ?? 1,
          pointsSpent: r.pointsSpent ?? r.PointsSpent ?? 0,
          status: r.status || r.Status || 'Pending',
          createdAt: r.createdAt || r.CreatedAt,
          approvedAt: r.approvedAt || r.ApprovedAt,
          deliveredAt: r.deliveredAt || r.DeliveredAt
        }));
      }),
      catchError(error => {
        console.error('Error fetching redemptions:', error);
        return of([]);
      })
    );
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
          delivered: 0
        };
        
        redemptions.forEach(r => {
          const status = (r.status || '').toLowerCase();
          if (status === 'pending' || status === '0') {
            counts.pending++;
          } else if (status === 'approved' || status === '1') {
            counts.approved++;
          } else if (status === 'delivered' || status === '2') {
            counts.delivered++;
          }
        });
        
        console.log('Redemption counts:', counts);
        return counts;
      }),
      catchError(error => {
        console.error('Error calculating redemption counts:', error);
        return of({ pending: 0, approved: 0, delivered: 0 });
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
