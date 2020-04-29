import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ConfirmationModule } from 'src/app/shared/components/confirmation/confirm.module';
import { NgxsModule } from '@ngxs/store';
import { UserListState } from 'src/app/states/users/user.state';
import { TableModule } from 'src/app/shared/components/table/table.module';
import {
  NgbPaginationModule,
  NgbDropdownModule,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserListComponent } from './user-list/user-list.component';
import { UserClient } from 'src/app/states/users/user.client';
import { DetailsModule } from 'src/app/shared/components/details/details.module';

const BootstrapModules = [
  NgbPaginationModule,
  NgbDropdownModule,
  NgbModalModule,
];

@NgModule({
  imports: [
    ...BootstrapModules,
    CommonModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([UserListState]),
    FontAwesomeModule,
    TableModule,
    ConfirmationModule,
    DetailsModule,
  ],
  providers: [UserClient],
  declarations: [UserListComponent, UserEditComponent],
  entryComponents: [UserEditComponent],
  exports: [UserListComponent],
})
export class UserModule {}
