import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AgentService } from '../Services/agent.service';
import { Router } from '@angular/router';
import { Property } from '../Model/property';
import { CombinedProfileProperty } from '../Model/agentProfile';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-agent-to-list-property',
  templateUrl: './agent-to-list-property.component.html',
  styleUrls: ['./agent-to-list-property.component.css']
})
export class AgentToListPropertyComponent {
  properties: CombinedProfileProperty[] = []; // List of properties
  property: CombinedProfileProperty = new CombinedProfileProperty(); // Current property being edited/added
  showButton = true;
  showForm = false;
  isEditMode = false;

  @ViewChild('addFile') addFileInput!: ElementRef;

  constructor(
    private agentService: AgentService,
    private router: Router,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.showLoader();
    this.loadProperties();
  }
  

  // Load properties associated with a specific agent
  loadProperties(): void {
    const min = 1;
    const max = 100000
    const agentId = this.authService.getLocalId(); // Replace with actual agent ID
    this.agentService.getPropertiesByAgent(agentId).subscribe(data => {
      this.properties = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      this.hideLoader();
    },
    (error) => {
      console.error('Error fetching Agent listed properties:', error);
      },
       () => {
      this.hideLoader(); // Hide loader on error as well
    });
  }

  // Show the form to add a new property
  showAddPropertyForm(): void {
    this.showForm = true;
    this.isEditMode = false;
    this.showButton = false;
    this.property = new CombinedProfileProperty(); // Reset the property object
  }

  // Edit an existing property
  editProperty(propertyId: string): void {
    this.showLoader();
    this.isEditMode = true;
    this.showForm = true;
    this.agentService.getProperty(propertyId).subscribe(data => {
      this.property = { id: propertyId, ...data };
      this.hideLoader();
    }, () => {
      this.hideLoader(); // Hide loader on error as well
    });
  }

  // Delete an existing property
  deleteProperty(propertyId: string): void {
    this.showLoader();
    this.agentService.deleteProperty(propertyId).subscribe(() => {
      this.loadProperties();
      this.hideLoader();
    }, () => {
      this.hideLoader(); // Hide loader on error as well
    });
  }

  // Submit the property form (create or update property)
  onPropertySubmit(): void {
    this.showLoader();
    if (this.isEditMode) {
      // Update existing property
      this.agentService.updateProperty(this.property.id, this.property).subscribe(() => {
        this.loadProperties();
        this.showForm = false;
        this.hideLoader();
      }, () => {
        this.hideLoader(); // Hide loader on error as well
      });
    } else {
      // Add a new property
      const newPropertyId = this.generateUniqueId();
      this.property.id = newPropertyId;
      this.property.agentId = this.authService.getLocalId(); // Replace with actual agent ID
      this.agentService.saveProperty(newPropertyId, this.property).subscribe(() => {
        this.agentService.getProperty(newPropertyId).subscribe(newProperty => {
          this.property = newProperty;
          this.loadProperties();
          this.showForm = false;
          this.hideLoader();
        }, () => {
          this.hideLoader(); // Hide loader on error as well
        });
      }, () => {
        this.hideLoader(); // Hide loader on error as well
      });
    }
  }

  // Handle file input change for images
  onImagesChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      this.property.images = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.property.images.push(e.target.result as string); // Save base64 string
        };
        reader.readAsDataURL(file); // Convert image to base64 string
      });
    }
  }

  // Generate a unique ID for a new property
  generateUniqueId(): string {
    return 'prop_' + Math.random().toString(36).substr(2, 9);
  }

  // Handle click event to add more image input fields dynamically
  ClickToAddFile(): void {
    const input = this.renderer2.createElement('input'); // Fix: use createElement
    this.renderer2.setAttribute(input, 'type', 'file');
    this.renderer2.setAttribute(input, 'multiple', 'true');
    this.renderer2.listen(input, 'change', (event) => this.onImagesChange(event));

    const container = this.addFileInput.nativeElement;
    this.renderer2.appendChild(container, input);
  }

  closeForm(): void {
    this.showForm = false;
  }

  // Show loader
  showLoader(): void {
    const loader = this.elementRef.nativeElement.querySelector('#globalLoader');
    if (loader) {
      loader.style.display = 'inline-grid';
    }
  }

  // Hide loader
  hideLoader(): void {
    const loader = this.elementRef.nativeElement.querySelector('#globalLoader');
    if (loader) {
      loader.style.display = 'none';
    }
  }
  createProperty() {
    const agentId = 'some-agent-id'; // Get this from authentication or user context

    this.agentService.getProfileExists(agentId).subscribe(profileExists => {
      if (profileExists) {
        // Proceed with property creation
      } else {
        // Show pop-up message and redirect to profile creation
        alert('You need to create a profile before adding a property.');
        this.router.navigate(['/profile-setting']);
      }
    });
  }
}
