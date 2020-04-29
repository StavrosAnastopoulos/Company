import { NgModule } from '@angular/core';
import { SharedPipedModule } from '../../pipes/shared-piped.module';
import { DetailsComponent } from './details.component';

@NgModule({
  imports: [SharedPipedModule],
  declarations: [DetailsComponent],
  entryComponents: [DetailsComponent],
})
export class DetailsModule {}
