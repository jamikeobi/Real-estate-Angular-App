import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../Services/agent.service';
import { Profile } from '../Model/profile';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {
  profile: Profile = new Profile();
  agentId: string;
  isEditing: boolean = false; // To toggle between view and edit modes

  constructor(
    private agentService: AgentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the agentId from route parameters
    this.route.params.subscribe(params => {
      this.agentId = params['id']; // Adjust according to your route parameter name
      this.loadProfile();
    });
  }

  loadProfile(): void {
    this.agentService.getProfile(this.agentId).subscribe(
      (data: Profile) => {
        this.profile = data || new Profile(); // Handle case where profile might not exist
        this.isEditing = false; // Set to false to display profile details
      },
      error => {
        console.error('Error loading profile', error);
      }
    );
  }

  saveProfile(): void {
    if (this.profile.name) {
      this.agentService.updateProfile(this.agentId, this.profile).subscribe(
        (data: Profile) => {
          this.profile = data; // Update the profile object with the response data
          this.isEditing = false; // Switch to view mode
          console.log('Profile updated:', data);
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    } else {
      console.error('Profile is invalid');
    }
  }

  editProfile(): void {
    this.isEditing = true; // Switch to edit mode
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
