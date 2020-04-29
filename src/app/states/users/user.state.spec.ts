import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { UserListState } from './user.state';
import { TableDataSelectors } from '../table-data/table-data.state';
import { UsersActions } from './user.actions';
import { IUser } from 'src/app/entities/user';
import { UserClient } from './user.client';
import { USERS_API_URL } from 'src/app/app.module';

const templateUser = (suffix: number): IUser =>
  <IUser>{
    name: `name${suffix}`,
    username: `username${suffix}`,
    phone: `872368476${suffix}`,
    email: `email@email.com${suffix}`,
  };

const seed = (size: number) => {
  const _ = [];
  for (let i = 0; i < size; i++) {
    _.push(templateUser(i));
  }
  return _;
};

describe('User List State', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([UserListState])],
      providers: [
        UserClient,
        {
          provide: USERS_API_URL,
          useValue: 'https://jsonplaceholder.typicode.com/users',
        },
      ],
    });

    store = TestBed.get(Store);
    store.reset({
      userState: {
        source: [...seed(10)],
        activePage: 1,
        itemsPerPage: 5,
        filterString: '',
        loading: false,
      },
    });
  });

  it('check source data length', () => {
    const sourceLength = store.selectSnapshot(
      TableDataSelectors.getSourceLength(UserListState)
    );
    expect(sourceLength).toEqual(10);
  });

  it('check paged data length', () => {
    const pagedLength = store.selectSnapshot(
      TableDataSelectors.getPagedDataLength(UserListState)
    );
    expect(pagedLength).toEqual(5);
  });

  it('check filtered data length', () => {
    store.dispatch(new UsersActions.ChangeFilter('name1'));
    const filteredLength = store.selectSnapshot(
      TableDataSelectors.getFilteredDataLength(UserListState)
    );
    expect(filteredLength).toEqual(1);
  });
});
