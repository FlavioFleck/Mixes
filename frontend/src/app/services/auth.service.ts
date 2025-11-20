import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:5010/auth';

  constructor(private http: HttpClient) {

  }

  register(data: any) {
    return this.http.post(`${this.API_URL}/register`, data);
  }
  
  login(data: any) {
    return this.http.post(`${this.API_URL}/login`, data);
  }

}
