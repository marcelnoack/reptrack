import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'rpt-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {

  public signInForm: FormGroup;
  public readonly isLoading$ = this._authService.isLoading$;
  public readonly error$ = this._authService.error$;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService) {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public signIn(): void {
    const email: string = this.signInForm.get('email')?.value;
    const password: string = this.signInForm.get('password')?.value;

    this._authService.signIn(email, password);
  }

  public isInValid(accessor: 'email' | 'password'): boolean {
    const dirty: boolean = this.signInForm.get(accessor)?.dirty === true;
    const touched: boolean = this.signInForm.get(accessor)?.touched === true;
    const hasError: boolean = this.signInForm.get(accessor)?.errors?.['required'];

    console.log(accessor, this.signInForm.get(accessor)?.errors);
    return (dirty || touched) && hasError;
  }

  public getErrorMessage(accessor: 'email' | 'password'): string {
    const dirty: boolean = this.signInForm.get(accessor)?.dirty === true;
    const touched: boolean = this.signInForm.get(accessor)?.touched === true;
    if(!dirty && !touched) return '';
    
    const formControl: AbstractControl | null = this.signInForm.get(accessor);
    if(accessor === 'email') {
      if (formControl?.errors?.['required']) {
        return 'Email is required. Please enter a valid email.'
      }

      if (formControl?.errors?.['email']) {
        return 'Invalid email. Please enter a valid email.';
      }
    }

    if (accessor === 'password' && formControl?.errors?.['required']) {
      return 'Password is required. Please enter your password.'
    }

    return '';
  }

}
