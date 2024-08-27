import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private apiUrl = 'https://real-estate-angular-project-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  // Profile methods
  getProfile(agentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profiles/${agentId}.json`);
  }

  saveProfile(agentId: string, profileData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profiles/${agentId}.json`, profileData);
  }

  updateProfile(agentId: string, profileData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/profiles/${agentId}.json`, profileData);
  }

  // Property methods
  getProperties(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/properties.json`);
  }

  getProperty(propertyId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/properties/${propertyId}.json`);
  }

  saveProperty(propertyId: string, propertyData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/properties/${propertyId}.json`, propertyData);
  }

  updateProperty(propertyId: string, propertyData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/properties/${propertyId}.json`, propertyData);
  }

  deleteProperty(propertyId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/properties/${propertyId}.json`);
  }
  
}
