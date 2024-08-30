import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile } from '../Model/profile';
import { CombinedProfileProperty } from '../Model/agentProfile';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'https://real-estate-angular-project-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  // Method to retrieve the auth token (assuming it's stored in localStorage after login)
  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  // Profile methods
  getProfile(agentId: string): Observable<Profile> {
    const token = this.getAuthToken();
    const url = `${this.apiUrl}/profiles/${agentId}.json?auth=${token}`;
    return this.http.get<Profile>(url);
  }

  saveProfile(agentId: string, profileData: any): Observable<Profile> {
    const token = this.getAuthToken();
    const url = `${this.apiUrl}/profiles/${agentId}.json?auth=${token}`;
    return this.http.put<Profile>(url, profileData);
  }

  updateProfile(agentId: string, profileData: any): Observable<Profile> {
    const token = this.getAuthToken();
    const url = `${this.apiUrl}/profiles/${agentId}.json?auth=${token}`;
    return this.http.patch<Profile>(url, profileData);
  }

  // Property methods
  getPropertiesByAgent(agentId: string): Observable<{ [key: string]: CombinedProfileProperty }> {
    const token = this.getAuthToken();
    const url = `${this.apiUrl}/properties.json?orderBy="agentId"&equalTo="${agentId}"&auth=${token}`;
    return this.http.get<{ [key: string]: CombinedProfileProperty }>(url);
  }

  getProperty(propertyId: string): Observable<CombinedProfileProperty> {
    const token = this.getAuthToken();
    const url = `${this.apiUrl}/properties/${propertyId}.json?auth=${token}`;
    return this.http.get<CombinedProfileProperty>(url);
  }

  getAllProperties(): Observable<CombinedProfileProperty[]> {
    const token = this.getAuthToken();
    const url = `${this.apiUrl}/properties.json?auth=${token}`;
    return this.http.get<{ [key: string]: CombinedProfileProperty }>(url)
      .pipe(
        map(data => Object.values(data)) // Convert object to array
      );
  }

  getAllAgents(): Observable<Profile[]> {
    const token = this.getAuthToken();
    const url = `${this.apiUrl}/profiles.json?auth=${token}`;
    return this.http.get<Profile[]>(url)
      .pipe(
        map(data => Object.values(data)) // Convert object to array
      );
  }

  saveProperty(propertyId: string, propertyData: CombinedProfileProperty): Observable<any> {
    const token = this.getAuthToken();
    const url = `${this.apiUrl}/properties/${propertyId}.json?auth=${token}`;
    return this.http.put<any>(url, propertyData);
  }

  updateProperty(propertyId: string, propertyData: CombinedProfileProperty): Observable<any> {
    const token = this.getAuthToken();
    const url = `${this.apiUrl}/properties/${propertyId}.json?auth=${token}`;
    return this.http.patch<any>(url, propertyData);
  }

  deleteProperty(propertyId: string): Observable<any> {
    const token = this.getAuthToken();
    const url = `${this.apiUrl}/properties/${propertyId}.json?auth=${token}`;
    return this.http.delete<any>(url);
  }

  // Method to check if a profile exists
  getProfileExists(agentId: string): Observable<boolean> {
    const token = this.getAuthToken();
    const url = `${this.apiUrl}/profiles/${agentId}.json?auth=${token}`;
    return this.http.get<any>(url)
      .pipe(
        map(profile => !!profile) // Returns true if profile exists, otherwise false
      );
  }
}
