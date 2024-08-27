import { Component, OnInit } from '@angular/core';
import { AgentService } from '../Services/agent.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {
  profile: any = {
    name: '',
    company: '',
    streetAddress: '',
    locality: '',
    state: '',
    country: '',
    phoneNumber: '',
    whatsappContact: '',
    image: '',
    description: ''
  };
  agentId: string = ''; // Initialize with the logged-in agent's ID or fetch it dynamically

  constructor(private agentService: AgentService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.agentId = this.route.snapshot.paramMap.get('id') || '';
    if (this.agentId) {
      this.loadProfile();
    }
  }

  loadProfile(): void {
    this.agentService.getProfile(this.agentId).subscribe(data => {
      if (data) {
        this.profile = data;
      }
    });
  }

  saveProfile(): void {
    if (this.agentId) {
      this.agentService.updateProfile(this.agentId, this.profile).subscribe(() => {
        this.router.navigate(['/']); // Redirect to the home page or another appropriate page after saving
      });
    } else {
      this.agentId = this.generateUniqueId();
      this.agentService.saveProfile(this.agentId, this.profile).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
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

  generateUniqueId(): string {
    return 'agent_' + Math.random().toString(36).substr(2, 9);
  }
}
