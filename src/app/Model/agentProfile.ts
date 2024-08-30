

export class CombinedProfileProperty {
    // Properties from Profile class
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
  
    // Properties from Property class
    id: string;
    title: string;
    location: string;
    price: string;
    bedrooms: number;
    toilets: number;
    bathrooms: number;
    parking: number;
    squareMeters: number;
    status: string;
    areaGuides: string;
    images: string[];
    agentId: string; // The ID of the agent who created the property
  
    constructor() {
      // Initialize properties from Profile
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
  
      // Initialize properties from Property
      this.id = '';
      this.title = '';
      this.location = '';
      this.price = '';
      this.description = '';  // Repeated description field from Profile
      this.bedrooms = 0;
      this.toilets = 0;
      this.bathrooms = 0;
      this.parking = 0;
      this.squareMeters = 0;
      this.status = 'rent';
      this.areaGuides = '';
      this.images = [];
      this.agentId = '';
    }
  }
  