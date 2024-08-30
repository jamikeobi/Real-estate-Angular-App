import { Component, HostListener, OnInit } from '@angular/core';
import { UserDetails } from '../Model/userdetails';
import { AuthService } from '../Services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string | undefined = '';
  isDropDownOpen = false;
  user: UserDetails | null = null;
  isLoggedIn = false;
  isBuyer = false;
  isAgent = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;
      this.isLoggedIn = !!user;
      this.isBuyer = this.authService.isBuyer();
      this.isAgent = this.authService.isAgent();
    });
  }

  toggleDropdown() {
    this.isDropDownOpen = !this.isDropDownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    const clickedInside = (event.target as HTMLElement).closest('.profile-dropdown');
    if (!clickedInside) {
      this.isDropDownOpen = false;
    }
  }

  logout() {
    // Implement logout logic
  }

  deleteAccount() {
    // Implement delete account logic
  } 
}
