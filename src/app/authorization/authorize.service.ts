import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  private _userManager: UserManager;

  constructor() {
    this._userManager = new UserManager(environment.identityConfig);

    this._userManager.events.addUserSignedOut(async () => {
      await this._userManager.removeUser();
      this.logout();
    });
  }

  public login = (): Promise<void> => this._userManager.signinRedirect();
  public logout = (): Promise<void> => this._userManager.signoutRedirect();

  public getUser = (): Promise<User> => this._userManager.getUser();

  public isAuthenticated = (): Promise<boolean> =>
    this.getUser().then((u) => !!u && !u.expired)

  public renewToken = (): Promise<User> => this._userManager.signinSilent();

  public getAccessToken = (): Promise<string> =>
    this.getUser().then((user) => {
      if (user) {
        if (user.expired) {
          return this.renewToken().then(
            (renewdUser) => renewdUser.access_token
          );
        }
        return user.access_token;
      } else {
        return '';
      }
    })
}
