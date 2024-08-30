import { Component, inject } from '@angular/core';
import { CombinedProfileProperty } from '../Model/agentProfile';
import { Profile } from '../Model/profile';
import { AgentService } from '../Services/agent.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  properties: CombinedProfileProperty[] = [];
  profiles: { [key: string]: Profile } = {}; // Store profiles indexed by agentId

  agentService: AgentService = inject(AgentService);

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.agentService.getAllProperties().subscribe((data: CombinedProfileProperty[]) => {
      this.properties = data;
      this.loadAgentProfiles();
    },
    (error) => {
      console.error('Error fetching properties:', error);
    });
  }

  loadAgentProfiles(): void {
    const agentIds = Array.from(new Set(this.properties.map(property => property.agentId)));
  
    console.log('Fetching profiles for agent IDs:', agentIds); // Debugging log
  
    agentIds.forEach(agentId => {
      this.agentService.getProfile(agentId).subscribe(profile => {
        this.profiles[agentId] = profile;
        console.log(`Profile stored for agent ${agentId}:`, this.profiles[agentId]); // Debugging log
      },
      (error) => {
        console.error(`Error fetching profile for agent ${agentId}:`, error);
      });
    });
  }
  
  getProfile(agentId: string): Profile | undefined {
    return this.profiles[agentId];
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 1, // adjust as needed
      spaceBetween: 10, // adjust as needed
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    });
  }
}
