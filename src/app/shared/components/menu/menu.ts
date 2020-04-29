export interface IMenuItem
  extends IRouteItem,
    ILinkItem,
    IGroupItem,
    IValueItem {
  name: string;
  icon?: any;
}

export interface IRouteItem {
  route?: string;
  fragment?: string;
}

export interface ILinkItem {
  href?: string;
}

export interface IGroupItem {
  children?: IMenuItem[];
}

export interface IValueItem {
  value?: any;
}
