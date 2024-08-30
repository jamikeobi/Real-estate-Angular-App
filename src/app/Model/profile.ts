export class Profile {
    agentId: any
    name: string;
    company: string;
    streetAddress: string;
    locality: string;
    state: string;
    country: string;
    phoneNumber: string;
    whatsappContact?: string; // Optional field
    image?: string; // Optional field for image URL
    description?: string; // Optional field
  
    constructor() {
      this.name = '';
      this.company = '';
      this.streetAddress = '';
      this.locality = '';
      this.state = '';
      this.country = '';
      this.phoneNumber = '';
      this.whatsappContact = '';
      this.image = '';
      this.description = '';
    }
  }

  