import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private userSource: BehaviorSubject<any>;

  user$;

  constructor() {
    const savedUser = localStorage.getItem("profile");

    this.userSource = new BehaviorSubject<any>(
      savedUser ? JSON.parse(savedUser) : null
    );

    this.user$ = this.userSource.asObservable();
  }

  updateUser(profile: any) {
    this.userSource.next(profile);

    localStorage.setItem("profile", JSON.stringify(profile));
  }

  clearUser() {
    this.userSource.next(null);
    localStorage.removeItem("profile");
  }
}
