import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserStateService } from '../../services/user-state';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  constructor(private router: Router, private userState: UserStateService) {}

  menuOpen = false;
  isLoggedIn = false;
  userName: string | null = null;
  userImage: string | null = null;

  ngOnInit() {
    this.loadFromLocalStorage();

    this.userState.user$.subscribe((profile: any) => {
      if (profile) {
        this.isLoggedIn = true;
        this.userName = profile.username;
        this.userImage = profile.profile_image
          ? `http://localhost:5010/uploads/profile/${profile.profile_image}`
          : null;
      } else {
        this.isLoggedIn = false;
        this.userName = null;
        this.userImage = null;
      }
    });
  }

  loadFromLocalStorage() {
    const user = localStorage.getItem('profile');
    if (user) {
      const parsed = JSON.parse(user);
      this.userName = parsed.username;
      this.userImage = parsed.profile_image
        ? `http://localhost:5010/uploads/profile/${parsed.profile_image}`
        : null;
      this.isLoggedIn = true;
    }
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }

  login() {
    this.menuOpen = false;
    this.router.navigate(['/auth/login']);
  }

  logout() {
    localStorage.clear();

    this.userName = null;
    this.userImage = null;
    this.isLoggedIn = false;

    this.userState.updateUser(null);

    this.menuOpen = false;
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.menuOpen && !event.target.closest('.user_options')) {
      this.menuOpen = false;
    }
  }
}
