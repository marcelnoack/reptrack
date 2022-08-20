import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserInputDTO } from 'src/app/core/model/users';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'rpt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup;
  public readonly isLoading$ = this._authService.isLoading$;
  public readonly error$ = this._authService.error$;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService) {
    this.userForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern(new RegExp('^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'))]],
      emailGroup: this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        emailConfirm: [''],
      }, { validators: [this._checkEmailMatches] }),
      passwordGroup: this._formBuilder.group({
        password: ['', [Validators.required, Validators.pattern(new RegExp(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ))]],
        passwordConfirm: ['']
      }, { validators: [this._checkPasswordMatches] })
    });
  }

  ngOnInit(): void {
  }

  public register(): void {

    const newUser: UserInputDTO = {
      username: this.userForm.get("username")?.value,
      firstName: this.userForm.get("firstName")?.value,
      lastName: this.userForm.get("lastName")?.value,
      email: this.userForm.get("emailGroup.email")?.value,
      password: this.userForm.get("passwordGroup.password")?.value
    }

    this._authService.register(newUser);

  }

  public getErrorMessage(accessor: string): string {
    const dirty: boolean = this.userForm.get(accessor)?.dirty === true;
    const touched: boolean = this.userForm.get(accessor)?.touched === true;
    if (!dirty && !touched) return '';

    const formControl: AbstractControl | null = this.userForm.get(accessor);
    if (accessor === 'firstName' && formControl?.errors?.['required']) {
      return 'First name is required.'
    }

    if (accessor === 'lastName' && formControl?.errors?.['required']) {
      return 'Last name is required.'
    }

    if (accessor === 'username') {
      if (formControl?.errors?.['required']) {
        return 'Username is required.'
      }
      if (formControl?.errors?.['pattern']) {
        return "Username has to contain between 8 and 20 characters."
      }
    }

    if (accessor === 'emailGroup.email') {
      if (formControl?.errors?.['required']) {
        return 'Email is required. Please enter a valid email.'
      }

      if (formControl?.errors?.['email']) {
        return 'Invalid email. Please enter a valid email.';
      }
    }

    if (accessor === 'emailGroup' && formControl?.errors) {
      return 'Emails do not match.';
    }

    if (accessor === 'passwordGroup.password') {
      if (formControl?.errors) {
        return  `Must contain at least eight characters, one uppercase and lowercase letter, a number, and a special character`;
      }

      if (formControl?.errors?.['required']) {
        return 'Invalid email. Please enter a valid email.';
      }
    }

    if (accessor === 'passwordGroup' && formControl?.errors) {
      return 'Passwords do not match.';
    }

    return '';
  }

  private _checkEmailMatches(group: AbstractControl): ValidationErrors | null {
    return group.get("email")?.value === group.get("emailConfirm")?.value ? null : { notSame: true };
  }

  private _checkPasswordMatches(group: AbstractControl): ValidationErrors | null {
    return group.get("password")?.value === group.get("passwordConfirm")?.value ? null : { notSame: true };
  }

}
