import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, TimeoutError } from 'rxjs';
import { map, tap, catchError, timeout } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ProductsService {
    constructor(http) {
        this.http = http;
        this.PRODUCTS_API_URL = `${API_CONFIG.getApiUrl()}/products`;
        this.ADMIN_API_URL = `${API_CONFIG.getApiUrl()}/admin`;
        // Observables for product data caching
        this.productListSubject$ = new BehaviorSubject([]);
        this.productDetailSubject$ = new BehaviorSubject(null);
        this.categoriesSubject$ = new BehaviorSubject([]);
        this.kpiSubject$ = new BehaviorSubject(null);
        // Public observables
        this.productList$ = this.productListSubject$.asObservable();
        this.productDetail$ = this.productDetailSubject$.asObservable();
        this.categories$ = this.categoriesSubject$.asObservable();
        this.kpi$ = this.kpiSubject$.asObservable();
    }
    /**
     * Get list of all products
     * BACKEND: GET /api/products?categoryId={categoryId}
     */
    getProducts(categoryId) {
        let url = this.PRODUCTS_API_URL;
        if (categoryId) {
            url += `?categoryId=${categoryId}`;
        }
        console.log('[ProductsService] Fetching products from:', url);
        return this.http.get(url).pipe(timeout(15000), tap(response => {
            console.log('[ProductsService] Raw response received:', response);
            const products = response.data || [];
            console.log('[ProductsService] Products count:', products.length);
            this.productListSubject$.next(products);
        }), map(response => response.data || []), catchError(error => {
            console.error('[ProductsService] Error fetching products:', error);
            this.productListSubject$.next([]);
            if (error instanceof TimeoutError) {
                return throwError(() => new Error('Request timed out. Please check your connection and try again.'));
            }
            throw error;
        }));
    }
    /**
     * Get all products including inactive (admin only)
     * BACKEND: GET /api/products/admin/all
     */
    getAllProductsAdmin() {
        const url = `${this.PRODUCTS_API_URL}/admin/all`;
        console.log('[ProductsService] Fetching all products (admin) from:', url);
        return this.http.get(url).pipe(timeout(15000), tap(response => {
            console.log('[ProductsService] All products received:', response);
            const products = response.data || [];
            console.log('[ProductsService] All products count:', products.length);
            this.productListSubject$.next(products);
        }), map(response => response.data || []), catchError(error => {
            console.error('[ProductsService] Error fetching all products:', error);
            this.productListSubject$.next([]);
            if (error instanceof TimeoutError) {
                return throwError(() => new Error('Request timed out. Please check your connection and try again.'));
            }
            throw error;
        }));
    }
    /**
     * Get product by ID
     * BACKEND: GET /api/products/{id}
     */
    getProductById(productId) {
        const url = `${this.PRODUCTS_API_URL}/${productId}`;
        console.log('[ProductsService] Fetching product detail from:', url);
        return this.http.get(url).pipe(timeout(10000), tap(product => {
            console.log('[ProductsService] Product detail received:', product);
            this.productDetailSubject$.next(product);
        }), catchError(error => {
            console.error('[ProductsService] Error fetching product detail:', error);
            this.productDetailSubject$.next(null);
            throw error;
        }));
    }
    /**
     * Get all product categories
     * BACKEND: GET /api/products/categories/all
     */
    getCategories() {
        const url = `${this.PRODUCTS_API_URL}/categories/all`;
        console.log('[ProductsService] Fetching categories from:', url);
        return this.http.get(url).pipe(timeout(10000), tap(response => {
            console.log('[ProductsService] Categories received:', response);
            const categories = response.data || [];
            this.categoriesSubject$.next(categories);
        }), map(response => response.data || []), catchError(error => {
            console.error('[ProductsService] Error fetching categories:', error);
            this.categoriesSubject$.next([]);
            throw error;
        }));
    }
    /**
     * Create new category
     * BACKEND: POST /api/products/categories
     */
    createCategory(request) {
        const url = `${this.PRODUCTS_API_URL}/categories`;
        console.log('[ProductsService] Creating category:', request);
        return this.http.post(url, request).pipe(timeout(10000), tap(category => {
            console.log('[ProductsService] Category created:', category);
            // Refresh categories list
            const currentCategories = this.categoriesSubject$.value;
            this.categoriesSubject$.next([...currentCategories, category]);
        }), catchError(error => {
            console.error('[ProductsService] Error creating category:', error);
            throw error;
        }));
    }
    /**
     * Create new product
     * BACKEND: POST /api/products
     */
    createProduct(request) {
        const url = this.PRODUCTS_API_URL;
        console.log('[ProductsService] Creating product:', request);
        return this.http.post(url, request).pipe(timeout(10000), tap(product => {
            console.log('[ProductsService] Product created:', product);
            // Refresh product list
            const currentProducts = this.productListSubject$.value;
            this.productListSubject$.next([...currentProducts, product]);
        }), catchError(error => {
            console.error('[ProductsService] Error creating product:', error);
            throw error;
        }));
    }
    /**
     * Update product details
     * BACKEND: PUT /api/products/{id}
     */
    updateProduct(productId, request) {
        const url = `${this.PRODUCTS_API_URL}/${productId}`;
        console.log('[ProductsService] Updating product:', productId, request);
        return this.http.put(url, request).pipe(timeout(10000), tap(response => {
            console.log('[ProductsService] Product updated:', response);
            // Refresh product detail if it's the current one
            const currentDetail = this.productDetailSubject$.value;
            if (currentDetail && currentDetail.id === productId) {
                this.getProductById(productId).subscribe();
            }
        }), catchError(error => {
            console.error('[ProductsService] Error updating product:', error);
            throw error;
        }));
    }
    /**
     * Adjust product stock
     * BACKEND: PUT /api/products/{id}/stock
     */
    adjustStock(productId, request) {
        const url = `${this.PRODUCTS_API_URL}/${productId}/stock`;
        console.log('[ProductsService] Adjusting stock:', productId, request);
        return this.http.put(url, request).pipe(timeout(10000), tap(response => {
            console.log('[ProductsService] Stock adjusted:', response);
            // Refresh product detail
            this.getProductById(productId).subscribe();
        }), catchError(error => {
            console.error('[ProductsService] Error adjusting stock:', error);
            throw error;
        }));
    }
    /**
     * Deactivate product with business rule enforcement
     * BACKEND: POST /api/products/{id}/deactivate
     *
     * @param productId - The product ID to deactivate
     * @param force - If true, bypasses soft warnings (stock > 0, recent demand) but not hard blocks
     * @returns Observable that:
     * - Completes successfully if deactivation succeeds
     * - Throws error with status 400 and DeactivateProductBlocked if hard blocked
     * - Throws error with status 409 and DeactivateProductWarnings if soft warnings exist
     */
    deactivateProduct(productId, force = false) {
        const url = `${this.PRODUCTS_API_URL}/${productId}/deactivate`;
        console.log('[ProductsService] Deactivating product:', productId, 'force:', force);
        return this.http.post(url, { force }).pipe(timeout(10000), tap(response => {
            console.log('[ProductsService] Product deactivated:', response);
            // Refresh product lists - use getAllProductsAdmin to include inactive products
            this.getAllProductsAdmin().subscribe();
        }), catchError(error => {
            console.error('[ProductsService] Error deactivating product:', error);
            throw error;
        }));
    }
    /**
     * Check if error response is a deactivation warning (409 Conflict)
     */
    isDeactivationWarning(error) {
        return error?.status === 409 && error?.error?.code === 'DEACTIVATE_WARNINGS';
    }
    /**
     * Check if error response is a deactivation block (400 Bad Request)
     */
    isDeactivationBlocked(error) {
        return error?.status === 400 && error?.error?.code === 'DEACTIVATE_BLOCKED';
    }
    /**
     * Activate product
     * BACKEND: POST /api/products/{id}/activate
     */
    activateProduct(productId) {
        const url = `${this.PRODUCTS_API_URL}/${productId}/activate`;
        console.log('[ProductsService] Activating product:', productId);
        return this.http.post(url, {}).pipe(timeout(10000), tap(response => {
            console.log('[ProductsService] Product activated:', response);
            // Refresh product lists - use getAllProductsAdmin to include inactive products
            this.getAllProductsAdmin().subscribe();
        }), catchError(error => {
            console.error('[ProductsService] Error activating product:', error);
            throw error;
        }));
    }
    /**
     * Delete product
     * BACKEND: DELETE /api/products/{id}
     */
    deleteProduct(productId) {
        const url = `${this.PRODUCTS_API_URL}/${productId}`;
        console.log('[ProductsService] Deleting product:', productId);
        return this.http.delete(url).pipe(timeout(10000), tap(response => {
            console.log('[ProductsService] Product deleted:', response);
            // Refresh product lists - use getAllProductsAdmin to include inactive products
            this.getAllProductsAdmin().subscribe();
        }), catchError(error => {
            console.error('[ProductsService] Error deleting product:', error);
            throw error;
        }));
    }
    /**
     * Get low stock products (Admin only)
     * BACKEND: GET /api/admin/products/low-stock?threshold={threshold}
     */
    getLowStockProducts(threshold = 10) {
        const url = `${this.ADMIN_API_URL}/products/low-stock?threshold=${threshold}`;
        console.log('[ProductsService] Fetching low stock products from:', url);
        return this.http.get(url).pipe(timeout(10000), tap(response => {
            console.log('[ProductsService] Low stock products received:', response);
        }), map(response => response.data || []), catchError(error => {
            console.error('[ProductsService] Error fetching low stock products:', error);
            throw error;
        }));
    }
    /**
     * Get redemptions for a specific product
     * BACKEND: GET /api/admin/redemptions (filtered by product)
     */
    getProductRedemptions(productId) {
        const url = `${this.ADMIN_API_URL}/redemptions`;
        console.log('[ProductsService] Fetching redemptions for product:', productId);
        return this.http.get(url).pipe(timeout(10000), map(response => {
            console.log('[ProductsService] All redemptions received:', response);
            // Filter redemptions by productId and map to ProductRedemption format
            const allRedemptions = response.items || [];
            const productRedemptions = allRedemptions
                .filter((r) => r.productId === productId)
                .map((r) => ({
                id: r.id,
                userId: r.userId,
                userName: r.userName,
                userEmail: r.userEmail,
                quantity: r.quantity,
                pointsSpent: r.pointsSpent,
                status: r.status,
                statusText: this.getRedemptionStatusText(r.status),
                requestDate: r.createdAt,
                approvedDate: r.approvedAt,
                deliveredDate: r.deliveredAt,
                adminNotes: r.adminNotes || ''
            }));
            console.log('[ProductsService] Product redemptions filtered:', productRedemptions);
            return productRedemptions;
        }), catchError(error => {
            console.error('[ProductsService] Error fetching product redemptions:', error);
            // Return empty array on error to prevent UI breaking
            return new BehaviorSubject([]).asObservable();
        }));
    }
    /**
     * Calculate KPIs for products dashboard
     */
    calculateKPIs(products) {
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
     * Convert redemption status enum to text
     */
    getRedemptionStatusText(status) {
        switch (status) {
            case 0: return 'Pending';
            case 1: return 'Approved';
            case 2: return 'Rejected';
            case 3: return 'Delivered';
            case 4: return 'Cancelled';
            default: return 'Unknown';
        }
    }
    /**
     * Filter products based on criteria
     */
    filterProducts(products, filter) {
        return products.filter(product => {
            // Search text filter
            if (filter.searchText) {
                const searchLower = filter.searchText.toLowerCase();
                const matchesSearch = product.name.toLowerCase().includes(searchLower) ||
                    product.categoryName?.toLowerCase().includes(searchLower) ||
                    product.description?.toLowerCase().includes(searchLower);
                if (!matchesSearch)
                    return false;
            }
            // Category filter
            if (filter.categoryIds && filter.categoryIds.length > 0) {
                if (!filter.categoryIds.includes(product.categoryId))
                    return false;
            }
            // Status filter
            if (filter.status === 'active' && !product.isActive)
                return false;
            if (filter.status === 'inactive' && product.isActive)
                return false;
            // Stock level filter
            if (filter.stockLevel) {
                if (filter.stockLevel === 'low' && (product.stockLevel >= 10 || product.stockLevel === 0))
                    return false;
                if (filter.stockLevel === 'out' && product.stockLevel !== 0)
                    return false;
                if (filter.stockLevel === 'unlimited' && product.stockLevel < 999999)
                    return false;
            }
            // Points cost range filter
            if (filter.minPoints !== undefined && product.pointsCost < filter.minPoints)
                return false;
            if (filter.maxPoints !== undefined && product.pointsCost > filter.maxPoints)
                return false;
            return true;
        });
    }
    /**
     * Clear cached product list
     */
    clearProductList() {
        this.productListSubject$.next([]);
    }
    /**
     * Clear cached product detail
     */
    clearProductDetail() {
        this.productDetailSubject$.next(null);
    }
    static { this.ɵfac = function ProductsService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProductsService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ProductsService, factory: ProductsService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProductsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=products.service.js.map