import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { UserInputDTO } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoading = new BehaviorSubject<boolean>(false);
  public readonly isLoading$ = this._isLoading.asObservable();

  private _error = new BehaviorSubject<string | null>(null);
  public readonly error$ = this._error.asObservable();

  constructor(private _http: HttpClient, private _router: Router) { }

  public isAuthenticated(): boolean {
    // TODO: in eigenen JWT-Service auslagern (Facade)
    // TODO: Local-/Session-/StorageService erzeugen (Facade mit erlaubten keys für Storage API)
    const token = localStorage.getItem("token");
    if (token) {
      const parsed = JSON.parse(token);
      const accessToken = parsed.accessToken;
      const decodedAccessToken: any = jwtDecode(accessToken);
      const expiryTime = decodedAccessToken.exp;
      if (expiryTime) {
        return !(Date.now() >= expiryTime * 1000);
      }
    }
    return false;
  }

  public register(newUser: UserInputDTO): void {
    this._isLoading.next(true);
    this._http.post(`${environment.apiBaseUrl}/auth/signup`, { user: newUser }, { observe: 'response' }).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this._isLoading.next(false);
          this._router.navigate(['auth', 'signin']);
        }
      },
      error: (error) => {
        console.error(error);
        this._error.next(error);
        this._isLoading.next(false);
      }
    })
  }

  public signIn(email: string, password: string): void {
    this._isLoading.next(true);
    this._http.post(`${environment.apiBaseUrl}/auth/signin`, { user: { email, password } }, { observe: 'response' }).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this._isLoading.next(false);
          localStorage.setItem("token", JSON.stringify(response.body));
          this._router.navigate(['']);
        }
      },
      error: (error) => {
        console.error(error);
        this._error.next(error);
        this._isLoading.next(false);
      }
    })
  }

  public signOut(): void {
    localStorage.removeItem("token");
    window.location.reload();
  }
}
