import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthResponse } from "./AuthResponse";
import { AuthService } from "../Services/auth.service";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

  export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
      return this.authService.user.pipe(
        map((user) => {
          if (user) {
            return true; // Allow access
          } else {
            this.router.navigate(['/login']); // Redirect to login
            return false;
          }
        })
      );
    }
    
  }