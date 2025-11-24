import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileHeader } from './profile-header/profile-header';
import { Rightbar } from '../../components/rightbar/rightbar';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ProfileHeader, Rightbar],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  
}
