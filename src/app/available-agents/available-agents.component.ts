import { Component, inject } from '@angular/core';
import { CombinedProfileProperty } from '../Model/agentProfile';
import { AgentService } from '../Services/agent.service';
import { Profile } from '../Model/profile';

@Component({
  selector: 'app-available-agents',
  templateUrl: './available-agents.component.html',
  styleUrls: ['./available-agents.component.css']
})
export class AvailableAgentsComponent {
  agentProfiles: Profile[] = [];
  filteredAgentProfiles: Profile[] = [];
  searchTerm: string = '';

  agentService: AgentService = inject(AgentService);

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.agentService.getAllAgents().subscribe((data) => {
      this.agentProfiles = data;
      this.filteredAgentProfiles = data; // Initially, show all agents
    });
  }

  searchAgents(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredAgentProfiles = this.agentProfiles;
    } else {
      this.filteredAgentProfiles = this.agentProfiles.filter(agent =>
        agent.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
