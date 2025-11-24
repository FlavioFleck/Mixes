import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LikeService {
  private API_LIKE_URL = 'http://localhost:5010/like'

  constructor(private http: HttpClient) {}

  createLike(like: any) {
    return this.http.post(`${this.API_LIKE_URL}/create`, like)
  }

  deleteLike(like: any) {
    return this.http.delete(`${this.API_LIKE_URL}/delete/${JSON.stringify(like)}`)
  }

}
