import {
  AlertStateModel,
  AddAlertModel,
  RemoveAlertModel,
  AlertModel,
} from './alert.model';
import { Injectable } from '@angular/core';
import { State, Select, Action, StateContext, Store } from '@ngxs/store';
import { AlertAtions } from './alert.actions';
import { Guid } from 'src/app/shared/utils/guid';

@State<AlertStateModel>({
  name: 'alertState',
  defaults: {
    alerts: [],
  },
})
@Injectable()
export class AlertState {
  @Select()
  static getAlerts(state: any) {
    return state.alertState.alerts;
  }

  constructor(private store: Store) {}

  @Action(AlertAtions.Add)
  add(ctx: StateContext<AlertStateModel>, { alert }: AddAlertModel) {
    const timeoutId = Guid.newGuid();
    ctx.setState({
      alerts: [...ctx.getState().alerts, { ...alert, timeoutId }],
    });
    setTimeout(() => {
      const index = this.store
        .selectSnapshot(AlertState.getAlerts)
        .findIndex((a: AlertModel) => a.timeoutId === timeoutId);
      if (index > -1) {
        this.store.dispatch(new AlertAtions.Remove(index));
      }
    }, alert.timeout || 3000);
  }

  @Action(AlertAtions.Remove)
  remove(ctx: StateContext<AlertStateModel>, { index }: RemoveAlertModel) {
    const oldState = ctx.getState();
    if (oldState.alerts.length > index) {
      ctx.setState({
        alerts: [
          ...oldState.alerts.slice(0, index),
          ...oldState.alerts.slice(index + 1),
        ],
      });
    }
  }
}
