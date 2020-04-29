import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserModule } from 'src/app/widgets/users/users.module';

@NgModule({
  imports: [HomeRoutingModule, UserModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
