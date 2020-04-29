import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import {
  NgbAccordionModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DesktopNavMenuComponent } from './desktop-nav-menu/desktop-nav-menu.component';
import { MobileNavMenuComponent } from './mobile-nav-menu/mobile-nav-menu.component';
import { ClickOutsideModule } from 'src/app/shared/directives/click-outside/click-outside.module';
import { MenuModule } from 'src/app/shared/components/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    NgbAccordionModule,
    NgbCollapseModule,
    ClickOutsideModule,
  ],
  declarations: [
    NavBarComponent,
    NavMenuComponent,
    UserAvatarComponent,
    DesktopNavMenuComponent,
    MobileNavMenuComponent,
  ],
  exports: [NavBarComponent],
})
export class NavBarModule {}
