import { Injectable } from '@angular/core';
import {
  UpdateUserModel,
  DeleteUserModel,
  UserListStateModel,
} from './user.model';
import { State, StateContext, Action } from '@ngxs/store';
import { UsersActions } from './user.actions';
import { IFilterData, IPageData } from '../table-data/table-data.model';
import { UserClient } from './user.client';

@State<UserListStateModel>({
  name: 'userState',
  defaults: {
    source: [],
    activePage: 1,
    itemsPerPage: 5,
    filterString: '',
    loading: false,
  },
})
@Injectable()
export class UserListState {
  constructor(private userClient: UserClient) {}

  @Action(UsersActions.Add)
  add(ctx: StateContext<UserListStateModel>, { user }: UpdateUserModel) {
    ctx.patchState({ loading: true });
    this.userClient.create(user).subscribe(
      (success) => {
        ctx.patchState({
          source: [...ctx.getState().source, success],
          loading: false,
        });
      },
      (error) => {
        ctx.patchState({ loading: false });
      }
    );
  }

  @Action(UsersActions.Edit)
  edit(ctx: StateContext<UserListStateModel>, { id, user }: UpdateUserModel) {
    ctx.patchState({ loading: true });
    const oldState = ctx.getState();
    const index = oldState.source.findIndex((u) => u.id === id);
    if (index > -1) {
      this.userClient.update(id, user).subscribe(
        (success) => {
          ctx.patchState({
            source: [
              ...oldState.source.slice(0, index),
              success,
              ...oldState.source.slice(index + 1),
            ],
            loading: false,
          });
        },
        (error) => {
          ctx.patchState({ loading: false });
        }
      );
    }
  }

  @Action(UsersActions.Delete)
  delete(ctx: StateContext<UserListStateModel>, { id }: DeleteUserModel) {
    ctx.patchState({ loading: true });
    const oldState = ctx.getState();
    const index = oldState.source.findIndex((u) => u.id === id);
    if (index > -1) {
      this.userClient.delete(id).subscribe(
        (success) => {
          ctx.patchState({
            source: [
              ...oldState.source.slice(0, index),
              ...oldState.source.slice(index + 1),
            ],
            loading: false,
          });
        },
        (error) => {
          ctx.patchState({ loading: false });
        }
      );
    }
  }

  @Action(UsersActions.GetList)
  getList(ctx: StateContext<UserListStateModel>) {
    ctx.patchState({ loading: true });
    this.userClient.getList().subscribe(
      (users) => ctx.patchState({ source: users, loading: false }),
      (error) => {
        ctx.patchState({ loading: false });
      }
    );
  }

  @Action(UsersActions.ChangeFilter)
  changeFilter(
    ctx: StateContext<UserListStateModel>,
    { filterString }: IFilterData
  ) {
    ctx.patchState({ filterString });
  }

  @Action(UsersActions.ChangePage)
  changePage(ctx: StateContext<UserListStateModel>, { activePage }: IPageData) {
    ctx.patchState({ activePage });
  }

  @Action(UsersActions.ChangeItemsPerPage)
  changeItemsPerPage(
    ctx: StateContext<UserListStateModel>,
    { itemsPerPage }: IPageData
  ) {
    ctx.patchState({ itemsPerPage });
  }
}
