import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      // Check if the route has specific role requirements
      const requiredRoles = route.data['roles'] as string[];
      if (requiredRoles && requiredRoles.length > 0) {
        const userRoles = this.authService.getRoles();
        
        // Debug logging
        console.log('[AuthGuard] Checking roles:', { requiredRoles, userRoles });
        
        // Check if user has any of the required roles
        if (userRoles && userRoles.length > 0 && requiredRoles.some(role => userRoles.includes(role))) {
          return true;
        }
        
        // User doesn't have required role - redirect to unauthorized
        console.warn('[AuthGuard] User does not have required roles');
        this.router.navigate(['/unauthorized']);
        return false;
      }
      // No specific role requirement, user is authenticated
      return true;
    }

    // Not authenticated, redirect to login
    console.warn('[AuthGuard] User not authenticated');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
