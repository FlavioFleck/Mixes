import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router'; // para carregar as páginas

import { Header } from '../components/header/header';
import { Sidebar } from '../components/sidebar/sidebar';
import { Rightbar } from '../components/rightbar/rightbar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Sidebar, Rightbar],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  isProfileRoute = false;  // Flag para identificar se está em /profile

  constructor(private router: Router) {
    // Escutando as mudanças de rota
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verificando se a URL contém "/profile"
        this.isProfileRoute = event.urlAfterRedirects.startsWith('/profile');
      }
    });
  }
}