import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuItemComponent } from './menu-item.component';
import { MenuListComponent } from './menu-list.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const Components = [MenuItemComponent, MenuListComponent];

@NgModule({
  imports: [CommonModule, RouterModule, NgbAccordionModule, FontAwesomeModule],
  declarations: [...Components],
  exports: [...Components],
})
export class MenuModule {}
