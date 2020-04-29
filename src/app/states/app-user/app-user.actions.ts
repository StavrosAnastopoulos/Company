export namespace AppUserActions {
  export class Decode {
    static readonly type = '[AppUserActions] Decode';

    constructor(public token: string) {}
  }
}
