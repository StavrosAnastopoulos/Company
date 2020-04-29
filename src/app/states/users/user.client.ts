import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USERS_API_URL } from 'src/app/app.module';
import { IUser } from 'src/app/entities/user';
import { CRUDClient, AbstractWebService } from 'src/app/shared/services/client';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngxs/store';

@Injectable()
export class UserClient extends AbstractWebService
  implements CRUDClient<IUser> {
  private apiUrl: string;
  constructor(
    protected httpClient: HttpClient,
    @Inject(USERS_API_URL) apiUrl: string,
    protected store: Store
  ) {
    super(store);
    this.apiUrl = apiUrl;
  }

  public getList() {
    return this.httpClient
      .get<IUser[]>(`${this.apiUrl}`)
      .pipe(catchError((error) => this.onError(error)));
  }

  public get(id: number) {
    return this.httpClient
      .get<IUser>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.onError(error)));
  }

  public create(entitiy: IUser) {
    return this.httpClient.post<IUser>(`${this.apiUrl}`, entitiy).pipe(
      map((success) => this.onSuccess(success, 'User Created Successfully')),
      catchError((error) => this.onError(error))
    );
  }

  public update(id: number, entitiy: IUser) {
    return this.httpClient.put<IUser>(`${this.apiUrl}/${id}`, entitiy).pipe(
      map((success) => this.onSuccess(success, 'User Updated Successfully')),
      catchError((error) => this.onError(error))
    );
  }

  public delete(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`).pipe(
      map((success) => this.onSuccess(success, 'User Deleted Successfully')),
      catchError((error) => this.onError(error))
    );
  }
}
