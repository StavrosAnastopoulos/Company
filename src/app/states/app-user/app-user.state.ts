import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AppUserActions } from './app-user.actions';
import { AppUserModel, DecodeUserModel } from './app-user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@State<AppUserModel>({
  name: 'appUserState',
  defaults: null,
})
@Injectable()
export class AppUserState {
  private jwtHelper: JwtHelperService;

  @Selector()
  static user(state: AppUserModel) {
    return state;
  }

  @Selector()
  static userName(state: AppUserModel) {
    return state ? state.userName : '';
  }

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  @Action(AppUserActions.Decode)
  decode(ctx: StateContext<AppUserModel>, { token }: DecodeUserModel) {
    // const user = this.jwtHelper.decodeToken(token);
    this.http
      .get(`https://demo.identityserver.io/connect/userinfo`)
      .subscribe((user: any) =>
        ctx.setState({
          userName: user.name,
          firstName: user.given_name,
          lastName: user.family_name,
          email: user.email,
        })
      );
  }
}
