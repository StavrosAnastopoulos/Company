import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedPipedModule } from 'src/app/shared/pipes/shared-piped.module';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule, SharedPipedModule],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
