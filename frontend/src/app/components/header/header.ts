import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  ) {}

  // simulação de busca
  MOCK_USERS = [
    { name: "Atreus", username: "htt_def", image: "https://i.pravatar.cc/40?img=5" },
    { name: "Thiago", username: "httpsrealitys", image: "https://i.pravatar.cc/40?img=12" },
    { name: "Neto", username: "http_neto", image: "https://i.pravatar.cc/40?img=30" },
  ];

  onSearchChange() {
    if (this.searchQuery.trim() === "") {
      this.showDropdown = false;
      this.results = [];
      return;
    }

    this.results = this.MOCK_USERS.filter(u =>
      u.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.showDropdown = true;
  }

  goToProfile(username: string) {
    this.showDropdown = false;
    this.searchQuery = "";
    this.router.navigate(['/profile', username]);
  }
}
