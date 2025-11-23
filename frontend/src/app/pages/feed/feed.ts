import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Rightbar } from '../../components/rightbar/rightbar';
import { Post } from '../../components/post/post';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { PostWriter } from '../../components/post-writer/post-writer';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, Header, Sidebar, Rightbar, Post, FormsModule, Rightbar, PostWriter],
  templateUrl: './feed.html',
  styleUrl: './feed.css'
})

export class Feed {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadFeed()
  }

  loadFeed() {
    this.postService.getPosts().subscribe((res: any) => {
      this.posts = res
    })
  }

  onPostCreated(post: any) {
    this.posts.unshift(post);
  }
}