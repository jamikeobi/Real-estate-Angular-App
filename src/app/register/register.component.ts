import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from '../Model/userdetails';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  registerForm: FormGroup;
  submitted: boolean= false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['buyer', Validators.required],
      agree: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    console.log(this.registerForm.get('username').errors); // For debugging

 
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const userDetails = new UserDetails(
        Date.now(),
        formValue.username,
        formValue.email,
        formValue.password,
        formValue.role,
        new Date(),
        formValue.username,
      );
      this.router.navigate(['/login']);

      this.authService.register(userDetails).subscribe(response => {
        console.log('User registered and saved successfully', response);
      }, error => {
        console.error('Error registering user', error);
      });
    }
    this.registerForm.reset()
  }
  
}
