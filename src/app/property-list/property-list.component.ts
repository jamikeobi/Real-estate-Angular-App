import { Component, inject, OnInit } from '@angular/core';
import { Property } from '../Model/property';
import { AgentService } from '../Services/agent.service';
import { CombinedProfileProperty } from '../Model/agentProfile';
import { Profile } from '../Model/profile'; // Import the Profile model

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
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
}
