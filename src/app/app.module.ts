import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NavigationsState } from './states/navigations/navigations.state';
import { environment } from 'src/environments/environment';
import { CoreModule } from './core/core.module';
import { AlertState } from './states/alerts/alert.state';
import { AuthorizeInterceptor } from './authorization/authorize.interceptor';
import { AppUserState } from './states/app-user/app-user.state';

export const BASE_API_URL = new InjectionToken<string>('BASE_API_URL');
export const USERS_API_URL = new InjectionToken<string>('USERS_API_URL');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    NgxsModule.forRoot([AppUserState, AlertState, NavigationsState], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false,
      },
      compatibility: {
        strictContentSecurityPolicy: true,
      },
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'NGXS store',
      maxAge: 10,
      disabled: environment.production,
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),

    CoreModule,
  ],
  providers: [
    { provide: BASE_API_URL, useValue: environment.webApiUrl },
    {
      provide: USERS_API_URL,
      useValue: 'https://jsonplaceholder.typicode.com/users',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizeInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
