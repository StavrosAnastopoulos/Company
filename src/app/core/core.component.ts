import { Component } from '@angular/core';

@Component({
  selector: 'app-shell',
  template: `
    <app-nav-bar></app-nav-bar>
    <app-alerts></app-alerts>
  `,
})
export class CoreComponent {}
