import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Real-Estate-Angular-App';
  isLoading: Observable<boolean>;

  constructor(private loadingService: AuthService) {
    this.isLoading = this.loadingService.loading$;
  }
}
