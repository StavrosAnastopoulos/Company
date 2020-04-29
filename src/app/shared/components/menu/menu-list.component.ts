import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IMenuItem } from './menu';

@Component({
  selector: 'app-menu-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="navbar-nav">
      <ng-content></ng-content>
    </ul>
  `,
  styles: [
    `
      .navbar-nav {
        padding: 5px;
      }
    `,
  ],
})
export class MenuListComponent {
  @Input() menu: IMenuItem[] = [];
}
