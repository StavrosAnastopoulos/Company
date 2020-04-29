import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  ITableColumn,
  ITableActionSelection,
} from 'src/app/shared/components/table/table.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UsersActions } from 'src/app/states/users/user.actions';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirm.component';
import { UserListState } from 'src/app/states/users/user.state';
import { TableDataSelectors } from 'src/app/states/table-data/table-data.state';
import { faSyncAlt, faExpand } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/entities/user';
import { DetailsComponent } from 'src/app/shared/components/details/details.component';

const modalConfig: NgbModalOptions = {
  centered: true,
  size: 'lg',
};

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  constructor(private store: Store, private modalService: NgbModal) {}
  @Select(TableDataSelectors.getPagedData(UserListState))
  user$: Observable<IUser[]>;

  @Select(TableDataSelectors.isLoading(UserListState))
  isLoading$: Observable<boolean>;

  @Select(TableDataSelectors.getFilteredDataLength(UserListState))
  collectionSize$: Observable<number>;

  @Select(TableDataSelectors.getItemsPerPage(UserListState))
  itemsPerPage$: Observable<number>;

  @Select(TableDataSelectors.getActivePage(UserListState))
  activePage$: Observable<number>;

  @Select(TableDataSelectors.getFilterString(UserListState))
  filterString$: Observable<string>;

  public headers: ITableColumn[] = [
    {
      name: 'Name',
      dataPointer: 'name',
    },
    {
      name: 'Username',
      dataPointer: 'username',
    },
    {
      name: 'Email',
      dataPointer: 'email',
    },
  ];

  public tableActions = [
    {
      name: 'details',
      displayName: 'Show Details',
      icon: faExpand,
    },
  ];

  public pageOptions = [
    { name: 'Show 2', value: 2 },
    { name: 'Show 5', value: 5 },
    { name: 'Show 10', value: 10 },
    { name: 'Show 20', value: 20 },
  ];

  private doAction = {
    add: (_) => this.addUser(),
    edit: (_) => this.editUser(_),
    delete: (_) => this.deleteUser(_),
    details: (_) => this.showDetails(_),
  };

  public faSyncAlt = faSyncAlt;

  ngOnInit(): void {
    if (
      this.store.selectSnapshot(TableDataSelectors.getPagedData(UserListState))
        .length === 0
    ) {
      this.requestData();
    }
  }

  requestData = () => this.store.dispatch(new UsersActions.GetList());

  onChangePage = (event: number) =>
    this.store.dispatch(new UsersActions.ChangePage(event))

  onChangeNumberOfItems = (event: number) =>
    this.store.dispatch(new UsersActions.ChangeItemsPerPage(event))

  onChangeFilterString = (event: string) =>
    this.store.dispatch(new UsersActions.ChangeFilter(event))

  onTableAction = (event: ITableActionSelection) =>
    this.doAction[event.name](event.row)

  addUser = () => {
    const modalRef = this.modalService.open(UserEditComponent, modalConfig);
    modalRef.componentInstance.title = 'Create User';
    modalRef.componentInstance.isEdit = false;
    modalRef.result.then(
      (successResult) =>
        this.store.dispatch(new UsersActions.Add(successResult)),
      (errorResult) => {}
    );
  }

  editUser = (user: IUser) => {
    const modalRef = this.modalService.open(UserEditComponent, modalConfig);
    modalRef.componentInstance.title = 'Edit User';
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.setUser({ ...user });
    modalRef.result.then(
      (successResult) =>
        this.store.dispatch(new UsersActions.Edit(user.id, successResult)),
      (errorResult) => {}
    );
  }

  deleteUser = (user: IUser) => {
    const modalRef = this.modalService.open(ConfirmationComponent, modalConfig);
    modalRef.componentInstance.content = `Are you sure you want to delete user: ${user.name}`;
    modalRef.result.then(
      (successResult) => this.store.dispatch(new UsersActions.Delete(user.id)),
      (errorResult) => {}
    );
  }

  showDetails = (user: IUser) => {
    const modalRef = this.modalService.open(DetailsComponent, modalConfig);
    modalRef.componentInstance.title = user.name;
    modalRef.componentInstance.content = user;
  }
}
