import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; // *ngIf

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.html',
  styleUrl: './post.css'
})
export class Post {

  public isMenuOpen = false;

  

  // função que abre/fecha o menu
  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  // listener que "escuta" cliques no documento inteiro
  @HostListener('document:click')
  onDocumentClick() {
      this.isMenuOpen = false;
  }
}