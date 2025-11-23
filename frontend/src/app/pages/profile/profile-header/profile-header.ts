import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.css',
})
export class ProfileHeader {

  isLoggedIn = false;
  isEditModalOpen = false;

  user: any = null;      
  profile: any = null;  

  name: string = '';
  bio: string = '';
  username: string = '';
  selectedImage: File | null = null;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem("token");
    const savedProfile = localStorage.getItem("profile");

    if (token) {
      this.isLoggedIn = true;

      const decoded = this.decodeToken(token);

      if (decoded) {
        this.user = decoded;
        this.name = decoded.name || "";
      }
    }

    if (savedProfile) {
      this.profile = JSON.parse(savedProfile);
      this.bio = this.profile.bio || "";
      this.username = this.profile.username || "";
    }
  }

  decodeToken(token: string) {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (err) {
      console.error('Erro ao decodificar token:', err);
      return null;
    }
  }

  handleImage(event: any) {
    this.selectedImage = event.target.files[0];
  }

  openModal() {
    if (this.profile) {
      this.bio = this.profile.bio || "";
      this.username = this.profile.username || "";
    }

    if (this.user) {
      this.name = this.user.name || "";
    }

    this.isEditModalOpen = true;
  }

  closeModal() {
    this.isEditModalOpen = false;
  }

  saveProfile() {
    const token = localStorage.getItem("token");

    const userId = this.user?.sub;
    if (!userId) {
      console.error("ERRO FATAL: user.sub não encontrado no token");
      return;
    }

    this.http.put(`http://localhost:5010/user/update/${userId}`, {
      name: this.name
    }).subscribe({
      next: (res: any) => {
        console.log("USER UPDATE:", res);

        if (res?.token) {
          localStorage.setItem("token", res.token);
          
          const decoded = this.decodeToken(res.token);
          this.user = decoded;
          this.name = decoded.name;
        }
      },
      error: err => console.error("Erro update user:", err)
    });

    const formData = new FormData();
    formData.append("bio", this.bio);
    formData.append("username", this.username);

    if (this.selectedImage) {
      formData.append("profileImage", this.selectedImage);
    }

    this.http.put("http://localhost:5010/profile/update", formData, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {

        console.log("PROFILE UPDATE:", res);

        if (res?.profile) {
          localStorage.setItem("profile", JSON.stringify(res.profile));
          this.profile = res.profile;
        }

        this.closeModal();
      },
      error: err => console.error("Erro update profile:", err)
    });
  }
}
