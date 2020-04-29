import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserEditComponent } from './user-edit.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/entities/user';

describe('User Form', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, NgbModalModule],
      declarations: [UserEditComponent],
      providers: [NgbActiveModal],
    });

    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
  });

  it('form invalid', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('form valid', () => {
    const user = <IUser>{
      name: 'some name',
      username: 'someUserName',
      phone: '+301234567890',
      email: 'email@email.com',
      address: {
        street: 'street name',
        suite: '69',
        city: 'big city',
        zipcode: '213-256',
      },
      company: {
        name: 'co',
      },
    };
    component.userForm.patchValue(user);
    expect(component.userForm.valid).toBeTruthy();
  });

  it('name field pattern invalid', () => {
    component.userForm.patchValue({ name: 'somename1' });
    const name = component.name;
    expect(name.valid).toBeFalsy();
  });

  it('name field pattern valid', () => {
    component.userForm.patchValue({ name: 'somename' });
    const name = component.name;
    expect(name.valid).toBeTruthy();
  });

  it('email field pattern invalid', () => {
    component.userForm.patchValue({ email: 'someemail' });
    const email = component.email;
    expect(email.valid).toBeFalsy();
  });

  it('email field pattern valid', () => {
    component.userForm.patchValue({ email: 'someemail@email.com' });
    const email = component.email;
    expect(email.valid).toBeTruthy();
  });
});
