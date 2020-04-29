export type AlertType =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'secondary'
  | 'light'
  | 'dark';

export interface Alert {
  type: AlertType;
  message: string;
  timeout?: number;
}

export interface AlertModel extends Alert {
  timeoutId: string;
}

export interface AlertStateModel {
  alerts: AlertModel[];
}

export interface AddAlertModel {
  alert: Alert;
}

export interface RemoveAlertModel {
  index: number;
}
