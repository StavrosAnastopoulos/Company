import { NgModule } from '@angular/core';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'src/app/shared/components/menu/menu.module';

@NgModule({
  imports: [CommonModule, ContactRoutingModule, MenuModule],
  declarations: [ContactComponent],
})
export class ContactModule {}
