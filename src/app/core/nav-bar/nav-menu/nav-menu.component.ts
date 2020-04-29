import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavigationsState } from '../../../states/navigations/navigations.state';
import { IMenuItem } from 'src/app/shared/components/menu/menu';

@Component({
  selector: 'app-nav-menu',
  template: `
    <app-menu-list>
      <app-menu-item
        *ngFor="let menuItem of menu$ | async"
        [menuItem]="menuItem"
      ></app-menu-item>
    </app-menu-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuComponent {
  @Select(NavigationsState.navigations) menu$: Observable<IMenuItem[]>;
}
