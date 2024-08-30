import { Component, inject } from '@angular/core';
import { CombinedProfileProperty } from '../Model/agentProfile';
import { AgentService } from '../Services/agent.service';

@Component({
  selector: 'app-available-agents',
  templateUrl: './available-agents.component.html',
  styleUrls: ['./available-agents.component.css']
})
export class AvailableAgentsComponent {
// agenProfile: Pro

agentProfiles: CombinedProfileProperty[] = [];

  agentService: AgentService = inject(AgentService);
  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.agentService.getAllAgents().subscribe((data: CombinedProfileProperty[]) => {
      this.agentProfiles = data;
    });
  }
}