import { inject, Injectable } from '@angular/core';
import { UserDetails } from '../Model/userdetails';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  Observable,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AuthResponse } from '../Model/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  user = new Subject<UserDetails>();
  constructor() {}

  private apiKey = 'AIzaSyDv7OhuQuvuLNX2nR3EmcC5LxeoG_jRL0o';
  private signUPUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  private dataBaseUrl = 'https://real-estate-angular-project-default-rtdb.firebaseio.com/registers';

  // Register
  register(userDetails: UserDetails): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.signUPUrl, {
        email: userDetails.email,
        password: userDetails.password,
        returnSecureToken: true,
      })
      .pipe(
        switchMap((authResponse) => {
          userDetails.id = +authResponse.localId;
          return this.storeUserData(userDetails, authResponse.idToken);
        }),
        tap((userDetails) => {
          this.user.next(userDetails); // Notify subscribers about user details
        }),
        catchError(this.handleError)
      );
  }

  // Store user data after successful registration
  storeUserData(userDetails: UserDetails, token: string): Observable<any> {
    const url = `${this.dataBaseUrl}/${userDetails.id}.json?auth=${token}`;
    return this.http.post(url, userDetails);
  }

  // Log in function
  logIn(email: string, password: string): Observable<UserDetails> {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        data
      )
      .pipe(
        switchMap((authResponse) => {
          return this.getUserData(+authResponse.localId, authResponse.idToken);
        }),
        tap((userDetails) => {
          this.user.next(userDetails); // Notify subscribers about user details
        }),
        catchError(this.handleError)
      );
  }

  // Fetch user data from Firebase
  getUserData(userId: number, token: string): Observable<UserDetails> {
    const url = `${this.dataBaseUrl}/${userId}.json?auth=${token}`;
    return this.http.get<UserDetails>(url);
  }

  private handleError(err) {
    console.log(err);

    let errorInfo = 'An unknown error has occurred.';
    if (!err.error || !err.error.error) {
      throwError(() => errorInfo);
    }
    switch (err.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorInfo = 'This email does not exist';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorInfo = 'Invalid email or password';
        break;
      case 'USER_DISABLED':
        errorInfo = 'User account has been disabled';
    }
    return throwError(() => errorInfo);
  }
}
