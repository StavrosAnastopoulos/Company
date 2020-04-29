import { IUser } from 'src/app/entities/user';

export namespace UsersActions {
  export class Add {
    static readonly type = '[UsersActions] Add';

    constructor(public user: IUser) {}
  }

  export class Edit {
    static readonly type = '[UsersActions] Edit';

    constructor(public id: number, public user: IUser) {}
  }

  export class Delete {
    static readonly type = '[UsersActions] Delete';

    constructor(public id: number) {}
  }

  export class GetList {
    static readonly type = '[UsersActions] Get List';
  }

  export class ChangeFilter {
    static readonly type = '[UsersActions] Change Filter';

    constructor(public filterString: string) {}
  }

  export class ChangePage {
    static readonly type = '[UsersActions] Change Page';

    constructor(public activePage: number) {}
  }

  export class ChangeItemsPerPage {
    static readonly type = '[UsersActions] Change Items Per Page';

    constructor(public itemsPerPage: number) {}
  }
}
