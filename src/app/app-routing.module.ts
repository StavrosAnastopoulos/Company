import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './authorization/authorize.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: './pages/home/home.module#HomeModule',
  },
  {
    path: 'contact',
    canActivate: [AuthGuard],
    loadChildren: './pages/contact/contact.module#ContactModule',
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: './pages/profile/profile.module#ProfileModule',
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
