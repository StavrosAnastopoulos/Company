import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthorizeService } from 'src/app/authorization/authorize.service';
import { Select } from '@ngxs/store';
import { AppUserState } from 'src/app/states/app-user/app-user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-avatar',
  templateUrl: 'user-avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  @Select(AppUserState.userName) userName$: Observable<string>;

  constructor(private authService: AuthorizeService) {}

  logout = () => this.authService.logout();
}
