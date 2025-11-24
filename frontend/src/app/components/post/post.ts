import { Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common'; // *ngIf

import { PostService } from '../../services/post.service'
import { LikeService } from '../../services/like.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post.html',
  styleUrl: './post.css'
})
export class Post {
  @Input() data: any
  @Input() loggedUserId!: number;

  @Output() deleted = new EventEmitter<number>();

  
  
  isOwner: boolean = true;

  public isMenuOpen = false;
  public liked = false;
  public likesQTD = 0;
  isDeleting = false;
  uniqueLikeId: string = '';


  constructor(private postService: PostService, private likeService: LikeService){}

  @HostBinding('class.creating') creatingClass = true;
  @HostBinding('class.deleting') get deleting() {
    return this.isDeleting;
  }

  ngOnInit() {
    this.uniqueLikeId = this.data.id
    this.isOwner = this.loggedUserId === this.data.user.id;
    this.likesQTD = this.data.likesCount

    requestAnimationFrame(() => {
      this.creatingClass = false;
    });
  }

  onLikeClick() {
    const like = {
      user_id: this.loggedUserId,
      post_id: this.data.id,
      like_id: this.data.likeId
    };

    if(!this.data.alreadyLiked) {
      this.likeService.createLike(like).subscribe((res: any) => {
        this.likesQTD = res.like_count;
        this.data.alreadyLiked = true;
        this.data.likeId = res.id; 
      })
    } else {
      this.likeService.deleteLike(like).subscribe((res: any) => {
        this.likesQTD = res.like_count;
        this.data.alreadyLiked = false;
        this.data.likeId = null;
      })
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
    this.isDeleting = true
    setTimeout(() => {
      const postId = this.data.id
      this.postService.deletePost(postId).subscribe((res: any) => {
        this.deleted.emit(postId)
      })
    }, 0.2 * 1000);
    
  }
}