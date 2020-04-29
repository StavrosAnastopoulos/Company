import { IMenuItem } from 'src/app/shared/components/menu/menu';

export namespace NavigationsActions {
  export class Configure {
    static readonly type = '[Navigations] Configure';

    constructor(public navigations: IMenuItem[]) {}
  }
}
