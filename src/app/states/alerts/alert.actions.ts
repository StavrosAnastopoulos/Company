import { Alert } from './alert.model';

export namespace AlertAtions {
  export class Add {
    static readonly type = '[Alert] Add';

    constructor(public alert: Alert) {}
  }
  export class Remove {
    static readonly type = '[Alert] Remove';

    constructor(public index: number) {}
  }
}
