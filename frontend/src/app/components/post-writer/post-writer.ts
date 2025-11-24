import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-writer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-writer.html',
  styleUrl: './post-writer.css'
})

export class PostWriter {
    @Output() postCreated = new EventEmitter<any>();

    posts: any[] = [];
    user: any
    content = ""
    
    constructor(private postService: PostService) {}

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem("profile")!)
    }

    createPost() {
        const post = {
            userId: this.user.user_id,
            content: this.content,
            file: null,
            songId: null,
            postFatherId: null
        }

        this.postService.createPost(post).subscribe({
        next: (post) => {
            console.log("Post criado", post)
            this.postCreated.emit(post)
        },
        error: (err) => {
            console.log("Erro ao criar post", err)
        }
        })
    }
}