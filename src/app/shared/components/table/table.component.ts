import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ITableColumn,
  ITableActionSelection,
  ITable,
  ITableAction,
} from './table.model';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements ITable {
  @Input() source: any[];
  @Input() headers: ITableColumn[];
  @Input() editable: boolean;
  @Input() extraActions: ITableAction[] = [];

  @Output() rowSelected = new EventEmitter<any>();
  @Output() actionSelected = new EventEmitter<ITableActionSelection>();

  iconAdd = {
    name: 'add',
    displayName: 'Add',
    icon: faPlus,
  };

  iconEdit = {
    name: 'edit',
    displayName: 'Edit',
    icon: faPen,
  };

  iconDelete = {
    name: 'delete',
    displayName: 'Delete',
    icon: faTrash,
  };

  onRowSelection = (row: any) => this.rowSelected.emit(row);

  onActionSelection = (name: string, row?: any) =>
    this.actionSelected.emit({ name, row })
}
