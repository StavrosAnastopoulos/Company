import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AlertState } from '../../states/alerts/alert.state';
import { Observable } from 'rxjs';
import { Alert } from '../../states/alerts/alert.model';
import { AlertAtions } from '../../states/alerts/alert.actions';

@Component({
  selector: 'app-alerts',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Select(AlertState.getAlerts) alerts$: Observable<Alert[]>;

  constructor(private store: Store) {}

  public close = (index: number) =>
    this.store.dispatch(new AlertAtions.Remove(index))
}
