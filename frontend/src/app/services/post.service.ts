import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class PostService {
  private API_URL = 'http://localhost:5010/post'

  constructor(private http: HttpClient) {}


  createPost(product: any) {
    return this.http.post(`${this.API_URL}/create`, product)
  }
}
