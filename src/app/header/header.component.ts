import { Component, HostListener, inject, OnInit } from '@angular/core';
import { UserDetails } from '../Model/userdetails';
import { AuthService } from '../Services/auth.service';

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

  ngOnInit() {
    this.authService.user.subscribe(userDetails => {
      this.user = userDetails;
      this.username = userDetails ? userDetails.username : '';
      this.isLoggedIn = !!userDetails;
      if (userDetails) {
        this.isBuyer = userDetails.role === 'buyer';
        this.isAgent = userDetails.role === 'agent';
      }
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
}
