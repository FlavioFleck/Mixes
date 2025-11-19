import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
    songs = Array(5).fill(0); // apenas mock

  topArtists = [
    { img: 'assets/images/artist1.jpg' },
    { img: 'assets/images/artist2.jpg' },
    { img: 'assets/images/artist3.jpg' },
    { img: 'assets/images/artist4.jpg' },
    { img: 'assets/images/artist5.png' }
  ];
}
