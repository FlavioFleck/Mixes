import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  constructor(private router: Router) {}

  menuOpen = false;

  isLoggedIn = false;
  userName: string | null = null;
  userImage: string | null = null;

ngOnInit() {
  const user = localStorage.getItem('profile');

  if (user) {
    const parsed = JSON.parse(user);
    this.userName = parsed.username || null;
    this.userImage = parsed.profile_image
      ? `http://localhost:5010/uploads/profile/${parsed.profile_image}`
      : null;
    this.isLoggedIn = true;
  } else {
    this.isLoggedIn = false;
  }
}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  login() {
    this.menuOpen = false;
    this.router.navigate(['/auth/login']);
  }

  logout() {
    localStorage.clear();
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
