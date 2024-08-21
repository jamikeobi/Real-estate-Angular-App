import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  properties = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      location: [''],
      priceRange: [500000],
      propertyType: [''],
      bedrooms: [1],
      bathrooms: [1],
      keywords: [''],
      transactionType: ['']
    });
  }

  onSearch(): void {
    const searchCriteria = this.searchForm.value;
    // this.propertyService.searchProperties(searchCriteria).subscribe((result) => {
    //   this.properties = result;
    // });
  }
}
