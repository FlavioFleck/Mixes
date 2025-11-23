import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private userDataSubject = new BehaviorSubject<any>(this.getLocalUser());
  userData$ = this.userDataSubject.asObservable();

  updateUser(data: any) {
    localStorage.setItem('profile', JSON.stringify(data));
    this.userDataSubject.next(data);
  }

  private getLocalUser() {
    const raw = localStorage.getItem('profile');
    return raw ? JSON.parse(raw) : null;
  }
}
