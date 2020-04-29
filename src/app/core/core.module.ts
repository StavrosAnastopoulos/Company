import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { AlertModule } from './alerts/alert.module';

@NgModule({
  imports: [NavBarModule, AlertModule],
  declarations: [CoreComponent],
  exports: [CoreComponent],
})
export class CoreModule {}
