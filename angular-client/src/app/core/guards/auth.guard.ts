import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { SignInComponent } from 'src/app/domains/auth/pages/signin/signin.component';
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

    if (route.component === SignInComponent && isAuth) {
      this._router.navigate(['/']);
      return false;
    }

    if (route.component !== SignInComponent && isAuth) {
      return true;
    }

    if (route.component !== SignInComponent && !isAuth) {
      this._router.navigate(["/signin"]);
      return false;
    }

    return true;
  }
}
