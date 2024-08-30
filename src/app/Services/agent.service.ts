import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Property } from '../Model/property';
import { CombinedProfileProperty } from '../Model/agentProfile';
import { Profile } from '../Model/profile';


@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'https://real-estate-angular-project-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  // Profile methods
  getProfile(agentId: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profiles/${agentId}.json`);
  }
  

  saveProfile(agentId: string, profileData: any): Observable<Profile> {
    return this.http.put<any>(`${this.apiUrl}/profiles/${agentId}.json`, profileData);
  }

  updateProfile(agentId: string, profileData: any): Observable<Profile> {
    return this.http.patch<any>(`${this.apiUrl}/profiles/${agentId}.json`, profileData);
  }

  // Property methods
  getPropertiesByAgent(agentId: string): Observable<{ [key: string]: CombinedProfileProperty }> {
    return this.http.get<{ [key: string]: CombinedProfileProperty }>(
      `${this.apiUrl}/properties.json?orderBy="agentId"&equalTo="${agentId}"`
    );
  }

  getProperty(propertyId: string): Observable<CombinedProfileProperty> {
    return this.http.get<CombinedProfileProperty>(`${this.apiUrl}/properties/${propertyId}.json`);
  }

  getAllProperties(): Observable<CombinedProfileProperty[]> {
    return this.http.get<{ [key: string]: CombinedProfileProperty }>(`${this.apiUrl}/properties.json`)
      .pipe(
        map(data => Object.values(data)) // Convert object to array
      );
  }
  getAllAgents(): Observable<CombinedProfileProperty[]>{
    return this.http.get<CombinedProfileProperty[]>(`${this.apiUrl}/agents.json`);
  }
  saveProperty(propertyId: string, propertyData: CombinedProfileProperty): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/properties/${propertyId}.json`, propertyData);
  }

  updateProperty(propertyId: string, propertyData: CombinedProfileProperty): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/properties/${propertyId}.json`, propertyData);
  }

  deleteProperty(propertyId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/properties/${propertyId}.json`);
  }

  // In agent.service.ts
getProfileExists(agentId: string): Observable<boolean> {
  return this.http.get<any>(`${this.apiUrl}/profiles/${agentId}.json`)
    .pipe(
      map(profile => !!profile) // Returns true if profile exists, otherwise false
    );
}

}
