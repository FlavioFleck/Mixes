import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class PostService {
  private API_POST_URL = 'http://localhost:5010/post'

  constructor(private http: HttpClient) {}

  createPost(post: any) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.API_POST_URL}/create`, post, { headers })
  }

  deletePost(postId: any) {
    return this.http.delete(`${this.API_POST_URL}/delete/${postId}`)
  }

  getPostId() {
    return this.http.get(`${this.API_POST_URL}/get`)
  }

  getPosts() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.API_POST_URL}/getAll`, { headers })
  }

  getPostsByUserId(user_id : any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_POST_URL}/getByUserId/${user_id}`, { headers })
  }
}
