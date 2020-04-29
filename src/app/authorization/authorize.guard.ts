import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthorizeService } from './authorize.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthorizeService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.grant(state);
  }
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(next, state);
  }

  private grant = async (state: RouterStateSnapshot) =>
    this._authService.getUser().then((u) => {
      if (!!u && !u.expired) {
        return true;
      } else {
        // store the current url to navigate back to after authorisation
        window.localStorage.setItem('returnUrl', state.url);
        this._authService.login();
        return false;
      }
    })
}
