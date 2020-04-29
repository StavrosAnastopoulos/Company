import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: 'details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  title: string;
  content: any;

  constructor(public activeModal: NgbActiveModal) {}

  close = () => this.activeModal.dismiss();
}
