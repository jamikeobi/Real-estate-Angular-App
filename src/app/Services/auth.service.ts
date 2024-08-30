import { inject, Injectable } from '@angular/core';
import { UserDetails } from '../Model/userdetails';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AuthResponse } from '../Model/AuthResponse';
import { User } from '../Model/userCheck';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  user = new BehaviorSubject<UserDetails | null>(null); // Use UserDetails directly
  newUser = new BehaviorSubject<User>(null)
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

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
          userDetails.id = authResponse.localId;
          return this.storeUserData(userDetails, authResponse.idToken);
        }),
        tap((res) => {
          this.handleCreateUser(res) // Notify subscribers about user details
        }),
        catchError(this.handleError)
      );
  }

  // Store user data after successful registration
  storeUserData(userDetails: UserDetails, token: string): Observable<any> {
    const url = `${this.dataBaseUrl}/${userDetails.id}.json?auth=${token}`;
    console.log('Storing user data at URL:', url);
    console.log('User Details:', userDetails);
    return this.http.post(url, userDetails).pipe(
      tap((response) => console.log('Data stored successfully:', response)),
      catchError((error) => {
        console.error('Error storing data:', error);
        return throwError(() => new Error('Failed to store user data'));
      })
    );
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
          console.log('Auth Response:', authResponse); // Debugging
          // Store the user details in the service state
          this.storeAuthResponse(authResponse);
          return this.getUserData(+authResponse.localId, authResponse.idToken);
          
        }),
        tap((res) => {
          this.handleCreateUser(res); // Notify subscribers about user details
        }),
        catchError(this.handleError)
      );
  }
  private handleCreateUser(res){
    const expiresInTS = new Date().getTime() + +res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTS);
    const user  = new User(res.email, res.localId, res.idToken, expiresIn);
    this.newUser.next(user);
    console.log(user);
    
  }
  // Store the auth response for later use
  private storeAuthResponse(authResponse: AuthResponse) {
    localStorage.setItem('authResponse', JSON.stringify(authResponse)); // Store in local storage
    this.user.next({ ...this.user.value, ...authResponse }); // Update user state
  }
  
 // Check if the user is a buyer
 isBuyer(): boolean {
  return this.user.value?.role === 'buyer';
}

// Check if the user is an agent
isAgent(): boolean {
  return this.user.value?.role === 'agent';
}


  // Fetch user data from Firebase
  getUserData(userId: number, token: string): Observable<UserDetails> {
    const url = 'https://real-estate-angular-project-default-rtdb.firebaseio.com/registers.json';
    console.log('Fetching user data from URL:', url); // Debugging
    return this.http.get<UserDetails>(url);
  }
  

  private handleError(err: any): Observable<never> {
    console.log(err);

    let errorInfo = 'An unknown error has occurred.';
    if (err.error && err.error.error) {
      switch (err.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorInfo = 'This email does not exist';
          break;
        case 'INVALID_PASSWORD':
          errorInfo = 'Invalid email or password';
          break;
        case 'USER_DISABLED':
          errorInfo = 'User account has been disabled';
          break;
        // Add more cases as needed
      }
    }
    return throwError(() => new Error(errorInfo));
  }
  // Check if the user is logged in
isLoggedIn(): boolean {
  const authResponse = JSON.parse(localStorage.getItem('authResponse') || '{}');
  return !!authResponse.idToken; // Return true if idToken is present
}

// Get current user's auth token
getToken(): string | null {
  const authResponse = JSON.parse(localStorage.getItem('authResponse') || '{}');
  return authResponse.idToken || null;
}

// Get current user's localId
getLocalId(): string | null {
  const authResponse = JSON.parse(localStorage.getItem('authResponse') || '{}');
  return authResponse.localId || null;
}
getCurrentUser(): Observable<{ agentId: string } | null> {
  // Replace with your actual implementation to get the authenticated user
  const mockUser = { agentId: this.getLocalId() };  // Mock data
  return of(mockUser);
}
show() {
  this.loadingSubject.next(true);
}

hide() {
  this.loadingSubject.next(false);
}
}
