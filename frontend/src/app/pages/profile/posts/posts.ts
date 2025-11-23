import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../components/post/post';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-profile-posts',
  standalone: true,
  imports: [CommonModule, Post],
  templateUrl: './posts.html',
  styleUrl: './posts.css'
})
export class Posts {

  constructor(private postService: PostService){}

  userPosts: any[] = []
  ngOnInit() {
    this.loadUserPosts()
  }

  loadUserPosts() {
    const user = JSON.parse(localStorage.getItem("profile")!)
    
    this.postService.getPostsByUserId(user.user_id).subscribe((res: any) => {
      this.userPosts = res
      console.log(res)
    })
  }

}
