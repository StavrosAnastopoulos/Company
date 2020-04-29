import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: 'confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent {
  content: string;

  constructor(public activeModal: NgbActiveModal) {}

  close = () => this.activeModal.dismiss();

  save = () => this.activeModal.close(true);
}
