import { HttpClient } from '@angular/common/http';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { UserDetails } from '../Model/userdetails';
import { map } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  allData: UserDetails[] = [];
  username: string | undefined = '';
  isDropDownOpen = false;
  http: HttpClient = inject(HttpClient);
  user: UserDetails | null = null;
  isLoggedIn = false;
  isBuyer = false;
  isAgent = false;

  constructor(private authService: AuthService){}


  toggleDropdown() {
    this.isDropDownOpen = !this.isDropDownOpen;
  }

  // ngOnInit(){
  //   this.authService.user.subscribe(userDetails => {
  //     this.user = userDetails;  
  //     this.username = userDetails.username;
  //     this.isLoggedIn = !!userDetails;
  //     if(userDetails){
  //       this.isBuyer = userDetails.role === 'buyer';
  //       this.isAgent = userDetails.role === 'agent';
  //     }
  //   })
  // }

  // Tap out to close dropdown
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    const clickedInside = (event.target as HTMLElement).closest('.profile-dropdown');
    if (!clickedInside) {
      this.isDropDownOpen = false;
    }
  }
}
