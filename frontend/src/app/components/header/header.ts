import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {

  searchQuery = "";
  results: any[] = [];
  showDropdown = false;

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) {}

  profiles: any[] = [];

  ngOnInit(){
    this.getProfile();
  }

  onSearchChange() {
    if (this.searchQuery.trim() === "") {
      this.showDropdown = false;
      this.results = [];
      return;
    }

    console.log(this.profiles)
    this.results = this.profiles.filter(u =>
      u.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.showDropdown = true;
  }

  getProfile(){
    this.profileService.getProfiles().subscribe((profiles: any) => {
      this.profiles = profiles
    })
  }

  goToProfile(username: string) {
    this.showDropdown = false;
    this.searchQuery = "";
    this.router.navigate(['/profile', username]);
  }
}
