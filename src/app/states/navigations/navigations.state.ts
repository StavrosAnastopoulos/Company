import { NavigationsStateModel } from './navigations.model';
import { Injectable } from '@angular/core';
import { Select, State, Action, StateContext } from '@ngxs/store';
import { NavigationsActions } from './navigations.actions';

@State<NavigationsStateModel>({
  name: 'navigationState',
  defaults: {
    navigations: [
      {
        name: 'Home',
        route: '/home',
      },
      {
        name: 'Contact',
        route: '/contact',
      },
    ],
  },
})
@Injectable()
export class NavigationsState {
  @Select()
  static navigations(state: any) {
    return state.navigationState.navigations;
  }

  @Action(NavigationsActions.Configure)
  configure(
    ctx: StateContext<NavigationsStateModel>,
    { navigations }: NavigationsStateModel
  ) {
    ctx.setState({ navigations });
  }
}
