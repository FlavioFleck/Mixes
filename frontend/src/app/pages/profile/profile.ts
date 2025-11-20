import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  isLoggedIn = true; // simulação de usuario logado (se mudar p false o botão some)
  isEditModalOpen = false; // controle do modal

  openModal() {
    this.isEditModalOpen = true;
  }

  closeModal() {
    this.isEditModalOpen = false;
  }

  saveProfile() {
    // lógica de salvar no backend entra aqui
    console.log('Perfil salvo!');
    this.closeModal();
  }
}
