import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirm.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: 'user-edit.component.html',
  styleUrls: ['user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent {
  public isEdit: boolean;
  public title: string;
  public namePattern = '^([^0-9]*)$';

  public userForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    website: [''],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      suite: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
    }),
    company: this.formBuilder.group({
      name: ['', Validators.required],
    }),
  });

  get name() {
    return this.userForm.get('name');
  }
  get username() {
    return this.userForm.get('username');
  }
  get email() {
    return this.userForm.get('email');
  }
  get phone() {
    return this.userForm.get('phone');
  }
  get street() {
    return this.userForm.get('address').get('street');
  }
  get suite() {
    return this.userForm.get('address').get('suite');
  }
  get city() {
    return this.userForm.get('address').get('city');
  }
  get zipcode() {
    return this.userForm.get('address').get('zipcode');
  }
  get companyName() {
    return this.userForm.get('company').get('name');
  }

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  public setUser = (user) => this.userForm.patchValue(user);

  close = (isDirty: boolean) => {
    if (isDirty) {
      const modalRef = this.modalService.open(ConfirmationComponent, {
        centered: true,
        size: 'lg',
      });
      modalRef.componentInstance.content = `Form has been edited and you will lose your changes. Continue?`;
      modalRef.result.then(
        (success) => this.activeModal.dismiss(),
        (error) => {}
      );
    } else {
      this.activeModal.dismiss();
    }
  }

  save = () => this.activeModal.close(this.userForm.value);
}
