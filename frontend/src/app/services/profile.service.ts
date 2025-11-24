import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private API_URL = 'http://localhost:5010/profile';

  constructor(private http: HttpClient) {}

createProfile(data: FormData) {
  const token = localStorage.getItem('token');

  return this.http.post(
    `${this.API_URL}/create`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}


  updateProfile(data: any) {
    return this.http.put(`${this.API_URL}/update`, data);
  }

  deleteProfile() {
    return this.http.delete(`${this.API_URL}/delete`);
  }

  getProfileByUsername(username: string) {
    return this.http.get(`${this.API_URL}/${username}`);
  }

  getProfiles() {
    return this.http.get(`${this.API_URL}/getAll`)
  }
}
