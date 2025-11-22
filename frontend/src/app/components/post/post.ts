import { Component, HostListener, Input} from '@angular/core';
import { CommonModule } from '@angular/common'; // *ngIf

import { PostService } from '../../services/post.service'

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.html',
  styleUrl: './post.css'
})
export class Post {
  @Input() data: any
  @Input() isOwner: boolean = false;

  public isMenuOpen = false;
  public liked = false;

  constructor(private postService: PostService){}

  onLikeClick() {
    this.liked = !this.liked

    if(this.liked) {
      console.log("like feito!")
    } else {
      console.log("like desfeito!")
    }
  }

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

  editPost() {
    console.log("Edit post", this.data);
  }

  deletePost() {
    console.log("Delete post", this.data);
  }
}