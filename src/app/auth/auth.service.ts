import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UserameAvailableResponse {
  available: boolean;
}

interface SignUpCredentional {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SignInCredentials {
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  signedIn$ = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UserameAvailableResponse>(`${environment.baseURL}/auth/username`, { username });
  }

  signup(credentials: SignUpCredentional) {
    return this.http.post<SignUpResponse>(`${environment.baseURL}/auth/signup`, credentials)
      .pipe( tap( () => this.signedIn$.next(true)) );
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(`${environment.baseURL}/auth/signedin`)
    .pipe( tap( ({ authenticated }) => this.signedIn$.next(authenticated)) );
  }

  signout() {
    return this.http.post(`${environment.baseURL}/auth/signout`, {})
      .pipe( tap( () => this.signedIn$.next(false)) );
  }

  signin(credentials: SignInCredentials) {
    return this.http.post(`${environment.baseURL}/auth/signin`, credentials)
    .pipe( tap( () => this.signedIn$.next(true)) );
  }
}
