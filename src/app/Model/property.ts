export class Property {
    id: string;
    title: string;
    location: string;
    price: string;
    description: string;
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
      this.id = '';
      this.title = '';
      this.location = '';
      this.price = '';
      this.description = '';
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
  