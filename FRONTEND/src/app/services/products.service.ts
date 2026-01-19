import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, TimeoutError } from 'rxjs';
import { map, tap, catchError, timeout } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import {
  Product,
  ProductDetail,
  ProductCategory,
  ProductKPI,
  CreateProductRequest,
  UpdateProductRequest,
  UpdateStockRequest,
  ProductListResponse,
  ProductDetailResponse,
  CategoriesResponse,
  ProductFilter,
  ProductRedemption,
  ProductRedemptionsResponse,
  LowStockProduct,
  LowStockResponse
} from '../models/product.models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly PRODUCTS_API_URL = `${API_CONFIG.getApiUrl()}/products`;
  private readonly ADMIN_API_URL = `${API_CONFIG.getApiUrl()}/admin`;

  // Observables for product data caching
  private productListSubject$ = new BehaviorSubject<Product[]>([]);
  private productDetailSubject$ = new BehaviorSubject<ProductDetail | null>(null);
  private categoriesSubject$ = new BehaviorSubject<ProductCategory[]>([]);
  private kpiSubject$ = new BehaviorSubject<ProductKPI | null>(null);

  // Public observables
  public productList$ = this.productListSubject$.asObservable();
  public productDetail$ = this.productDetailSubject$.asObservable();
  public categories$ = this.categoriesSubject$.asObservable();
  public kpi$ = this.kpiSubject$.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get list of all products
   * BACKEND: GET /api/products?categoryId={categoryId}
   */
  getProducts(categoryId?: string): Observable<Product[]> {
    let url = this.PRODUCTS_API_URL;
    
    if (categoryId) {
      url += `?categoryId=${categoryId}`;
    }
    
    console.log('[ProductsService] Fetching products from:', url);

    return this.http.get<ProductListResponse>(url).pipe(
      timeout(15000),
      tap(response => {
        console.log('[ProductsService] Raw response received:', response);
        const products = response.data || [];
        console.log('[ProductsService] Products count:', products.length);
        this.productListSubject$.next(products);
      }),
      map(response => response.data || []),
      catchError(error => {
        console.error('[ProductsService] Error fetching products:', error);
        this.productListSubject$.next([]);
        if (error instanceof TimeoutError) {
          return throwError(() => new Error('Request timed out. Please check your connection and try again.'));
        }
        throw error;
      })
    );
  }

  /**
   * Get product by ID
   * BACKEND: GET /api/products/{id}
   */
  getProductById(productId: string): Observable<ProductDetail> {
    const url = `${this.PRODUCTS_API_URL}/${productId}`;
    console.log('[ProductsService] Fetching product detail from:', url);

    return this.http.get<ProductDetail>(url).pipe(
      timeout(10000),
      tap(product => {
        console.log('[ProductsService] Product detail received:', product);
        this.productDetailSubject$.next(product);
      }),
      catchError(error => {
        console.error('[ProductsService] Error fetching product detail:', error);
        this.productDetailSubject$.next(null);
        throw error;
      })
    );
  }

  /**
   * Get all product categories
   * BACKEND: GET /api/products/categories/all
   */
  getCategories(): Observable<ProductCategory[]> {
    const url = `${this.PRODUCTS_API_URL}/categories/all`;
    console.log('[ProductsService] Fetching categories from:', url);

    return this.http.get<CategoriesResponse>(url).pipe(
      timeout(10000),
      tap(response => {
        console.log('[ProductsService] Categories received:', response);
        const categories = response.data || [];
        this.categoriesSubject$.next(categories);
      }),
      map(response => response.data || []),
      catchError(error => {
        console.error('[ProductsService] Error fetching categories:', error);
        this.categoriesSubject$.next([]);
        throw error;
      })
    );
  }

  /**
   * Create new product
   * BACKEND: POST /api/products
   */
  createProduct(request: CreateProductRequest): Observable<Product> {
    const url = this.PRODUCTS_API_URL;
    console.log('[ProductsService] Creating product:', request);

    return this.http.post<Product>(url, request).pipe(
      timeout(10000),
      tap(product => {
        console.log('[ProductsService] Product created:', product);
        // Refresh product list
        const currentProducts = this.productListSubject$.value;
        this.productListSubject$.next([...currentProducts, product]);
      }),
      catchError(error => {
        console.error('[ProductsService] Error creating product:', error);
        throw error;
      })
    );
  }

  /**
   * Update product details
   * BACKEND: PUT /api/products/{id}
   */
  updateProduct(productId: string, request: UpdateProductRequest): Observable<any> {
    const url = `${this.PRODUCTS_API_URL}/${productId}`;
    console.log('[ProductsService] Updating product:', productId, request);

    return this.http.put(url, request).pipe(
      timeout(10000),
      tap(response => {
        console.log('[ProductsService] Product updated:', response);
        // Refresh product detail if it's the current one
        const currentDetail = this.productDetailSubject$.value;
        if (currentDetail && currentDetail.id === productId) {
          this.getProductById(productId).subscribe();
        }
      }),
      catchError(error => {
        console.error('[ProductsService] Error updating product:', error);
        throw error;
      })
    );
  }

  /**
   * Adjust product stock
   * BACKEND: PUT /api/products/{id}/stock
   */
  adjustStock(productId: string, request: UpdateStockRequest): Observable<any> {
    const url = `${this.PRODUCTS_API_URL}/${productId}/stock`;
    console.log('[ProductsService] Adjusting stock:', productId, request);

    return this.http.put(url, request).pipe(
      timeout(10000),
      tap(response => {
        console.log('[ProductsService] Stock adjusted:', response);
        // Refresh product detail
        this.getProductById(productId).subscribe();
      }),
      catchError(error => {
        console.error('[ProductsService] Error adjusting stock:', error);
        throw error;
      })
    );
  }

  /**
   * Get low stock products (Admin only)
   * BACKEND: GET /api/admin/products/low-stock?threshold={threshold}
   */
  getLowStockProducts(threshold: number = 10): Observable<LowStockProduct[]> {
    const url = `${this.ADMIN_API_URL}/products/low-stock?threshold=${threshold}`;
    console.log('[ProductsService] Fetching low stock products from:', url);

    return this.http.get<LowStockResponse>(url).pipe(
      timeout(10000),
      tap(response => {
        console.log('[ProductsService] Low stock products received:', response);
      }),
      map(response => response.data || []),
      catchError(error => {
        console.error('[ProductsService] Error fetching low stock products:', error);
        throw error;
      })
    );
  }

  /**
   * Get redemptions for a specific product
   * BACKEND: GET /api/redemptions/user/{userId} (filtered by product)
   * Note: Using the redemptions endpoint and filtering by product
   */
  getProductRedemptions(productId: string): Observable<ProductRedemption[]> {
    // This is a placeholder - actual implementation may need a dedicated endpoint
    // or use the user redemptions endpoint with filtering
    console.log('[ProductsService] Fetching redemptions for product:', productId);
    
    // For now, return empty array. Will be implemented when redemptions service is ready
    return new BehaviorSubject<ProductRedemption[]>([]).asObservable();
  }

  /**
   * Calculate KPIs for products dashboard
   */
  calculateKPIs(products: Product[]): ProductKPI {
    const activeProducts = products.filter(p => p.isActive);
    const inactiveProducts = products.filter(p => !p.isActive);
    const lowStockProducts = activeProducts.filter(p => p.stockLevel > 0 && p.stockLevel < 10);
    const totalRedeemablePoints = activeProducts.reduce((sum, p) => sum + (p.pointsCost * p.stockLevel), 0);

    return {
      totalActiveProducts: activeProducts.length,
      lowStockProducts: lowStockProducts.length,
      inactiveProducts: inactiveProducts.length,
      totalRedeemablePoints
    };
  }

  /**
   * Filter products based on criteria
   */
  filterProducts(products: Product[], filter: ProductFilter): Product[] {
    return products.filter(product => {
      // Search text filter
      if (filter.searchText) {
        const searchLower = filter.searchText.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(searchLower) ||
          product.categoryName?.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filter.categoryIds && filter.categoryIds.length > 0) {
        if (!filter.categoryIds.includes(product.categoryId)) return false;
      }

      // Status filter
      if (filter.status === 'active' && !product.isActive) return false;
      if (filter.status === 'inactive' && product.isActive) return false;

      // Stock level filter
      if (filter.stockLevel) {
        if (filter.stockLevel === 'low' && (product.stockLevel >= 10 || product.stockLevel === 0)) return false;
        if (filter.stockLevel === 'out' && product.stockLevel !== 0) return false;
        if (filter.stockLevel === 'unlimited' && product.stockLevel < 999999) return false;
      }

      // Points cost range filter
      if (filter.minPoints !== undefined && product.pointsCost < filter.minPoints) return false;
      if (filter.maxPoints !== undefined && product.pointsCost > filter.maxPoints) return false;

      return true;
    });
  }

  /**
   * Clear cached product list
   */
  clearProductList(): void {
    this.productListSubject$.next([]);
  }

  /**
   * Clear cached product detail
   */
  clearProductDetail(): void {
    this.productDetailSubject$.next(null);
  }
}
