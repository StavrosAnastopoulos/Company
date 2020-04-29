import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mobile-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="btn" (click)="show = !show; $event.stopPropagation()">
      &#9776;
    </button>

    <div class="modal-backdrop" *ngIf="show">
      <app-desktop-nav (clickOutside)="onClickOutside()"></app-desktop-nav>
    </div>
  `,
  styles: [
    `
      button {
        position: absolute;
        left: 0;
      }

      .modal-backdrop {
        background-color: rgb(0, 0, 0, 0.5);
      }
    `,
  ],
})
export class MobileNavMenuComponent {
  show = false;

  onClickOutside = () => (this.show = false);
}
