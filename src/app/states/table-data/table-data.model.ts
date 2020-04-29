export interface ITableData extends IFilterData, IPageData {
  source: any[];
  loading: boolean;
}

export interface IFilterData {
  filterString?: string;
}

export interface IPageData {
  activePage?: number;
  itemsPerPage?: number;
}
