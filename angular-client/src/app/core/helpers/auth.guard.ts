import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuth: boolean = this._authService.isAuthenticated();

    if (this._isAuthRoute(state.url) && isAuth) {
      this._router.navigate(['/']);
      return false;
    }

    if (!this._isAuthRoute(state.url) && isAuth) {
      return true;
    }

    if (!this._isAuthRoute(state.url) && !isAuth) {
      this._router.navigate(["auth/signin"]);
      return false;
    }

    return true;
  }

  private _isAuthRoute(url: string): boolean {
    return url.indexOf('/auth') !== -1;
  }
}
