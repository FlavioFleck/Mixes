import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileHeader } from './profile-header/profile-header';
import { Rightbar } from '../../components/rightbar/rightbar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ProfileHeader, Rightbar],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

}
