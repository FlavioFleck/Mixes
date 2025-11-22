import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class PostService {
  private API_POST_URL = 'http://localhost:5010/post'
  private API_LIKE_URL = 'http://localhost:5010/like'

  constructor(private http: HttpClient) {}

  like(like: any) {
    return this.http.post(`${this.API_LIKE_URL}/create`, like)
  }

  createPost(post: any) {
    return this.http.post(`${this.API_POST_URL}/create`, post)
  }

  getPostId() {
    return this.http.get(`${this.API_POST_URL}/get`)
  }

  getPosts(): any {
    return this.http.get(`${this.API_POST_URL}/getAll`)
  }
}
