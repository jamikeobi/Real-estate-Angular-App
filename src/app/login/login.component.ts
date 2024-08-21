import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[^@]+@[^@]+\\.[a-zA-Z]{2,6}')]],
      password: ['', Validators.required]
    });
  }

  onSubmitLogInForm() {
    if (this.loginForm.invalid) {
      // Trigger validation messages
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.logIn(email, password).subscribe(
      response => {
        console.log('Login successful:', response);
        this.router.navigate(['/home']); // Redirect to the home page or dashboard
      },
      error => {
        console.error('Login error:', error);
        // Show error message to the user
      }
    );
  }
}
