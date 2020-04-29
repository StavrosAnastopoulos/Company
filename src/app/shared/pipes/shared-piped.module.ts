import { NgModule } from '@angular/core';
import { HumanizePipe } from './humanize.pipe';
import { PrettyJsonPipe } from './pretty-json.pipe';

const Pipes = [HumanizePipe, PrettyJsonPipe];

@NgModule({
  declarations: [...Pipes],
  exports: [...Pipes],
})
export class SharedPipedModule {}
