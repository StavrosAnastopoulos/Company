import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AlertAtions } from 'src/app/states/alerts/alert.actions';

export interface CRUDClient<T> {
  get: (id: number) => Observable<T>;
  create: (entity: T) => Observable<T>;
  update: (id: number, entity: T) => Observable<T>;
  delete: (id: number) => Observable<any>;
}

@Injectable()
export abstract class AbstractWebService {
  constructor(protected store: Store) {}

  protected onSuccess = (success, message?: string) => {
    if (message) {
      this.store.dispatch(new AlertAtions.Add({ type: 'success', message }));
    }
    return success;
  }

  protected onError = (error: any, message?: string) => {
    if (!message) {
      if (ERROR_KEYS.includes(error.status)) {
        const errorObj = PRETTY_ERRORS[error.status];
        if (error.status === 400) {
          errorObj.message = error400(error.error);
        }
        message = errorObj.message;
      } else {
        message = PRETTY_ERRORS[500].message;
      }
    }
    this.store.dispatch(new AlertAtions.Add({ type: 'danger', message }));
    return throwError(error);
  }
}

const PRETTY_ERRORS = {
  400: {
    title: 'Request produced an error',
  },
  401: {
    title: 'Unauthorised Access to Resource',
    message: 'Please sign-in and try again.',
  },
  403: {
    title: 'Access to Resource is Forbidden',
    message:
      'If you think this is an error, please contact your administrator.',
  },
  404: {
    title: 'Request was not recognised',
  },
  0: {
    title: 'Request could not be processed',
  },
  500: {
    message: 'Server encountered an error. Oops?',
  },
  503: {
    message: 'Server is unavailable. Please try again later.',
  },
};
const ERROR_KEYS = Object.keys(PRETTY_ERRORS);

const error400 = (error) => {
  switch (typeof error) {
    case 'string':
      return error;
  }
};
