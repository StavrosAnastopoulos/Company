import { EventEmitter } from '@angular/core';

export interface ITableColumn {
  name: string;
  dataPointer: string;
}

export interface ITableAction {
  name: string;
  displayName: string;
  icons: string;
}

export interface ITableActionSelection {
  name: string;
  row?: any;
}

export interface IEmitSelectedRow {
  rowSelected: EventEmitter<any>;
}

export interface IEmitSelectedAction {
  actionSelected: EventEmitter<ITableActionSelection>;
}

export interface IEditable {
  editable: boolean;
}

export interface ITable
  extends IEditable,
    IEmitSelectedRow,
    IEmitSelectedAction {
  source: any[];
  headers: ITableColumn[];
}
