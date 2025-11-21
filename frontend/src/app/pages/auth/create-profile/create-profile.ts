import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './create-profile.html',
  styleUrl: './create-profile.css',
})
export class CreateProfile {
  username = '';
  bio = '';
  image: File | null = null;
  imagePreview: string | null = null; 

  constructor(private profileService: ProfileService, public router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.image = file;

      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreview = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  createProfile() {
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('bio', this.bio);

    if (this.image) {
      formData.append('profileImage', this.image);
    }

    this.profileService.createProfile(formData).subscribe({
      next: (res: any) => {

        localStorage.setItem("profile", JSON.stringify(res.profile));

        alert('Perfil criado com sucesso');
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        alert(err.error.error || 'Erro ao criar perfil');
      }
    });
  }
}
