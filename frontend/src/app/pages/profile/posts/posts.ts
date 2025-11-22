import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../components/post/post';

@Component({
  selector: 'app-profile-posts',
  standalone: true,
  imports: [CommonModule, Post],
  templateUrl: './posts.html',
  styleUrl: './posts.css'
})
export class Posts {

  userPosts = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];

}
