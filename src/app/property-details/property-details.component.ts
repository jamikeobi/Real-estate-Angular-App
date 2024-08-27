import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../Services/agent.service';
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  property: any;
  currentImage: string;
  showDetailView = true;

  constructor(private route: ActivatedRoute, private firebaseService: AgentService) { }

  ngOnInit() {
    const propertyId = this.route.snapshot.paramMap.get('id');
    this.firebaseService.getProperty(propertyId).subscribe(data => {
      this.property = data;
      this.currentImage = this.property.images[0];
    });
  }

  prevSlide() {
    // Logic for previous slide
  }

  nextSlide() {
    // Logic for next slide
  }

  showDetails() {
    this.showDetailView = true;
  }

  showMap() {
    this.showDetailView = false;
  }
}
