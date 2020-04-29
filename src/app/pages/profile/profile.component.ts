import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppUserState } from 'src/app/states/app-user/app-user.state';
import { Observable } from 'rxjs';
import { AppUserModel } from 'src/app/states/app-user/app-user.model';
import { Select } from '@ngxs/store';

@Component({
  templateUrl: 'profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  @Select(AppUserState.user) user$: Observable<AppUserModel>;
}
