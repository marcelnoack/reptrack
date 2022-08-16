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

  private _checkEmailMatches(group: AbstractControl): ValidationErrors | null {
    return group.get("email")?.value === group.get("emailConfirm")?.value ? null : { notSame: true };
  }

  private _checkPasswordMatches(group: AbstractControl): ValidationErrors | null {
    return group.get("password")?.value === group.get("passwordConfirm")?.value ? null : { notSame: true };
  }

}
