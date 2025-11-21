import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Rightbar } from '../../components/rightbar/rightbar';
import { Post } from '../../components/post/post';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, Header, Sidebar, Rightbar, Post, FormsModule, Rightbar],
  templateUrl: './feed.html',
  styleUrl: './feed.css'
})

export class Feed {
  post = {
    userId: 0,
    content: "",
    file: null,
    songId: null,
    postFatherId: null
  }

  posts: any[] = [];

  constructor(private postService: PostService) {}
  
  createPost() {
    this.postService.createPost(this.post).subscribe({
      next: (res) => {
        console.log("Post criado", res)
        this.posts.unshift(res);
      },
      error: (err) => {
        console.log("Erro ao criar post", err)
      }
    })
  }
}