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

    content = ""
    
    constructor(private postService: PostService) {}

    createPost() {
        const user = JSON.parse(localStorage.getItem("profile")!)
        const post = {
            userId: user.user_id,
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