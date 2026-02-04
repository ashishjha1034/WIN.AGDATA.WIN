import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';

export interface DashboardStats {
  totalUsers: number;
  totalPointsEarned: number;
  pointsRedeemed: number;
  pendingRedemptions: number;
  totalEventRegistrations: number;
}

export interface PendingRedemption {
  id: string;
  userId: string;
  productId: string;
  pointsSpent: number;
  quantity: number;
  status: string;
  createdAt: string;
}

export interface RecentEvent {
  id: string;
  name: string;
  description: string;
  eventDate: string;
  status: string;
  location: string;
  totalPointsPool: number;
  participantCount: number;
  createdAt: string;
}

export interface LowStockProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  currentStock: number;
  reserved: number;
  price: number;
  isActive: boolean;
}

export interface PointsChartData {
  labels: string[];
  earned: number[];
  redeemed: number[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly ADMIN_API_URL = `${API_CONFIG.getApiUrl()}/admin`;

  constructor(private http: HttpClient) { }

  /**
   * Fetch dashboard statistics
   */
  getStats(): Observable<DashboardStats> {
    const url = `${this.ADMIN_API_URL}/stats`;
    console.log('Fetching dashboard stats from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        // Backend returns PascalCase by default (TotalUsers). Accept both.
        const totalUsers = response.totalUsers ?? response.TotalUsers ?? 0;
        const totalPointsEarned = response.totalPointsEarned ?? response.TotalPointsEarned ?? 0;
        const pointsRedeemed = response.pointsRedeemed ?? response.TotalPointsRedeemed ?? 0;
        const pendingRedemptions = response.pendingRedemptions ?? response.PendingRedemptions ?? 0;
        const totalEventRegistrations = response.totalEventRegistrations ?? response.TotalEventRegistrations ?? 0;

        return {
          totalUsers,
          totalPointsEarned,
          pointsRedeemed,
          pendingRedemptions,
          totalEventRegistrations
        } as DashboardStats;
      })
    );
  }

  /**
   * Fetch pending redemptions
   */
  getPendingRedemptions(): Observable<PendingRedemption[]> {
    const url = `${this.ADMIN_API_URL}/redemptions`;
    const params = { status: '0' }; // 0 = Pending
    console.log('Fetching pending redemptions from:', url, 'with params:', params);
    return this.http.get<any>(url, { params }).pipe(
      map(response => {
        console.log('Pending redemptions response:', response);
        // Response structure: { items: [...], counts: {...} }
        return response.items || [];
      })
    );
  }

  /**
   * Fetch recent events
   */
  getRecentEvents(): Observable<RecentEvent[]> {
    const url = `${this.ADMIN_API_URL}/events/recent`;
    console.log('Fetching recent events from:', url);
    return this.http.get<any>(url).pipe(
      map(response => response.data || [])
    );
  }

  /**
   * Fetch low stock products
   */
  getLowStockProducts(): Observable<LowStockProduct[]> {
    const url = `${this.ADMIN_API_URL}/products/low-stock`;
    console.log('Fetching low stock products from:', url);
    return this.http.get<any>(url).pipe(
      map(response => response.data || [])
    );
  }

  /**
   * Fetch points chart data
   */
  getPointsChartData(months: number = 6): Observable<PointsChartData> {
    const url = `${this.ADMIN_API_URL}/stats/points-chart?months=${months}`;
    console.log('Fetching points chart data from:', url);
    return this.http.get<any>(url).pipe(
      map(response => {
        const chartData = response.data || [];
        return {
          labels: chartData.map((d: any) => d.monthName),
          earned: chartData.map((d: any) => d.pointsEarned),
          redeemed: chartData.map((d: any) => d.pointsRedeemed)
        };
      })
    );
  }

  /**
   * Fetch all dashboard data
   */
  getDashboardData(): Observable<any> {
    const url = `${this.ADMIN_API_URL}/dashboard`;
    console.log('Fetching complete dashboard data from:', url);
    return this.http.get<any>(url);
  }
}
