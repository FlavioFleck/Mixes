import { Component, HostListener } from '@angular/core';
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
export class Sidebar {

  constructor(private router: Router) {}

  menuOpen = false;
  userName: string | null = null;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  login() {
    this.menuOpen = false;
    this.router.navigate(['/auth/login']);
  }

  // função para fechar a caixa de fazer login quando o click não for dentro dela
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.menuOpen && !event.target.closest('.user_options')) {
      this.menuOpen = false;
    }
  }

}
