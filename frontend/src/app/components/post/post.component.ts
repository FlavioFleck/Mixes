import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  @Input() postData: any;
  isMenuOpen = false;

  // função chamada pelo (click)
  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  // adiciona função para cliques de fora
  @HostListener('document:click')
  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
}