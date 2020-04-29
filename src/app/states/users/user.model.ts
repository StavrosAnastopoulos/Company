import { ITableData } from '../table-data/table-data.model';
import { IUser } from 'src/app/entities/user';

export interface UserListStateModel extends ITableData {
  source: IUser[];
}

export interface UpdateUserModel {
  id: number;
  user: IUser;
}

export interface DeleteUserModel {
  id: number;
}
