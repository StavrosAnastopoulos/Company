import { createSelector } from '@ngxs/store';
import { ITableData, IPageData } from './table-data.model';

const filterPredicate = (data: any, searchQuery: string) => {
  const preparedQuery = searchQuery.trim().toLowerCase();
  for (const val of Object.values(data)) {
    const preparedVal = `${val}`.trim().toLowerCase();
    if (preparedVal.includes(preparedQuery)) {
      return true;
    }
  }

  return false;
};

const filterData = (data: any[], filterValue: string) => {
  if (!filterValue) {
    return data;
  }
  return data.filter((d) => filterPredicate(d, filterValue));
};

const pageData = (data: any[], page: IPageData) => {
  if (page) {
    const startIndex = (page.activePage - 1) * page.itemsPerPage;
    return data.slice(
      startIndex,
      Math.min(data.length, startIndex + page.itemsPerPage)
    );
  }
  return data;
};

export class TableDataSelectors {
  static isLoading(stateClass) {
    return createSelector([stateClass], (state: ITableData) => {
      return state.loading;
    });
  }

  static getSourceData(stateClass) {
    return createSelector([stateClass], (state: ITableData) => {
      return state.source;
    });
  }

  static getSourceLength(stateClass) {
    return createSelector([stateClass], (state: ITableData) => {
      return state.source.length;
    });
  }

  static getFilteredData(stateClass) {
    return createSelector([stateClass], (state: ITableData) => {
      return filterData(state.source, state.filterString);
    });
  }

  static getFilteredDataLength(stateClass) {
    return createSelector(
      [TableDataSelectors.getFilteredData(stateClass)],
      (filteredSource: any[]) => {
        return filteredSource.length;
      }
    );
  }

  static getPagedData(stateClass) {
    return createSelector(
      [stateClass, TableDataSelectors.getFilteredData(stateClass)],
      (state: ITableData, filteredSource: any[]) => {
        return pageData(filteredSource, {
          activePage: state.activePage,
          itemsPerPage: state.itemsPerPage,
        });
      }
    );
  }

  static getPagedDataLength(stateClass) {
    return createSelector(
      [TableDataSelectors.getPagedData(stateClass)],
      (pagedSource: any[]) => {
        return pagedSource.length;
      }
    );
  }

  static getFilterString(stateClass) {
    return createSelector([stateClass], (state: { filterString: string }) => {
      return state.filterString;
    });
  }

  static getActivePage(stateClass) {
    return createSelector([stateClass], (state: { activePage: number }) => {
      return state.activePage;
    });
  }
  static getItemsPerPage(stateClass) {
    return createSelector([stateClass], (state: { itemsPerPage: number }) => {
      return state.itemsPerPage;
    });
  }
}
