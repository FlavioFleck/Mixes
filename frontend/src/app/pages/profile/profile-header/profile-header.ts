import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.css',
})
export class ProfileHeader {

  isLoggedIn = false;
  isEditModalOpen = false;

  user: any = null;      
  profile: any = null;  

  constructor() {
    const token = localStorage.getItem("token");
    const savedProfile = localStorage.getItem("profile");

    if (token) {
      this.isLoggedIn = true;
      this.user = this.decodeToken(token);
    }

    if (savedProfile) {
      this.profile = JSON.parse(savedProfile);
    }
  }

  decodeToken(token: string) {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (err) {
      console.error('Erro ao decodificar token:', err);
      return null;
    }
  }

  openModal() {
    this.isEditModalOpen = true;
  }

  closeModal() {
    this.isEditModalOpen = false;
  }

  saveProfile() {
    console.log('Perfil salvo!');
    this.closeModal();
  }
}
