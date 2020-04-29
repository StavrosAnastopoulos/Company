import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-desktop-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-nav-menu></app-nav-menu>
    <app-user-avatar class="border-top mt-auto"></app-user-avatar>
  `,
  styles: [
    `
      :host {
        background: white;
        display: flex;
        height: 100%;
        width: 170px;
        flex-flow: column nowrap;
      }
    `,
  ],
})
export class DesktopNavMenuComponent {}
