import { Component } from '@angular/core';
import { AgentService } from '../Services/agent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-to-list-property',
  templateUrl: './agent-to-list-property.component.html',
  styleUrls: ['./agent-to-list-property.component.css']
})
export class AgentToListPropertyComponent {
  properties: any[] = [];
  showButton = true;
  showForm = false;
  isEditMode = false;
  property: any = {
    title: '',
    location: '',
    price: '',
    description: '',
    images: []
  };

  constructor(private agentService: AgentService, private router: Router) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.agentService.getProperties().subscribe(data => {
      this.properties = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    });
  }

  showAddPropertyForm(): void {
    this.showForm = true;
    this.isEditMode = false;
    this.showButton = false
    this.property = {
      title: '',
      location: '',
      price: '',
      description: '',
      images: []
    };
  }

  editProperty(propertyId: string): void {
    this.isEditMode = true;
    this.showForm = true;
    this.agentService.getProperty(propertyId).subscribe(data => {
      this.property = { id: propertyId, ...data };
    });
  }

  deleteProperty(propertyId: string): void {
    this.agentService.deleteProperty(propertyId).subscribe(() => {
      this.loadProperties();
    });
  }

  onPropertySubmit(): void {
    if (this.isEditMode) {
      this.agentService.updateProperty(this.property.id, this.property).subscribe(() => {
        this.loadProperties();
        this.showForm = false;
      });
    } else {
      const newPropertyId = this.generateUniqueId(); // Implement this function to generate unique IDs
      this.agentService.saveProperty(newPropertyId, this.property).subscribe(() => {
        this.loadProperties();
        this.showForm = false;
      });
    }
  }

  onImagesChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.property.images = Array.from(input.files).map(file => {
        return URL.createObjectURL(file as Blob);
      });
    }
  }
  
  generateUniqueId(): string {
    return 'prop_' + Math.random().toString(36).substr(2, 9);
  }
}
