import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from './authorization/authorize.service';
import { Store } from '@ngxs/store';
import { AppUserActions } from './states/app-user/app-user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthorizeService, private store: Store) {}

  async ngOnInit(): Promise<void> {
    const token = await this.authService.getAccessToken();
    if (token) {
      this.store.dispatch(new AppUserActions.Decode(token));
    }
  }
}
