import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserStateService } from '../../../services/user-state';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.css',
})
export class ProfileHeader {

  isOwner = false
  isLoggedIn = false
  isEditModalOpen = false

  user: any = null
  profile: any = null

  name: string = ''
  bio: string = ''
  username: string = ''
  selectedImage: File | null = null
  imagePreview: string | null = null

  constructor(private http: HttpClient, private userState: UserStateService, private route: ActivatedRoute, private profileService: ProfileService) {  
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

  ngOnInit() {
    const loggedUser = JSON.parse(localStorage.getItem("profile")!)

    this.route.paramMap.subscribe(params => {
      const username = params.get("username")
      if(username) {
        this.loadUser(username)
      }
    });
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
    const file = event.target.files[0];

    if (file) {
      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  openModal() {
    if (this.profile) {
      this.bio = this.profile.bio || "";
      this.username = this.profile.username || "";
    }
    this.isEditModalOpen = true;
  }

  closeModal() {
    this.isEditModalOpen = false;
  }

  saveProfile() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado!");
      return;
    }

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

          this.userState.updateUser(res.profile);
        }

        this.closeModal();
      },
      error: err => console.error("Erro update profile:", err)
    });
  }

  loadUser(username: string) {
    console.log(username)
    this.profileService.getProfileByUsername(username).subscribe((profile: any) => {
      this.profile = profile;

      const loggedUser = JSON.parse(localStorage.getItem("profile")!);
      this.isOwner = loggedUser.user_id === profile.user_id;
    });
  }
}
