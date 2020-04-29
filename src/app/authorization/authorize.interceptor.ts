import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthorizeService } from './authorize.service';

const isSameOriginUrl = (url: string) => {
  if (
    url.startsWith(environment.webApiUrl) ||
    url.startsWith(environment.identityConfig.authority)
  ) {
    return true;
  }
  if (/^\/[^\/].*/.test(url)) {
    return true;
  }
  return false;
};

@Injectable({
  providedIn: 'root',
})
export class AuthorizeInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthorizeService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this._authService.getAccessToken()).pipe(
      mergeMap((token) => this.processRequestWithToken(token, req, next))
    );
  }

  private processRequestWithToken(
    token: string,
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
    if (!!token && isSameOriginUrl(req.url)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }
}
