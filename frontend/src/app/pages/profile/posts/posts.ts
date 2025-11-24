import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../components/post/post';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-posts',
  standalone: true,
  imports: [CommonModule, Post,],
  templateUrl: './posts.html',
  styleUrl: './posts.css'
})
export class Posts {

  @Input() loggedUserId!: number;
  userPosts: any[] = []
  isOwner: boolean = true;



  constructor(private postService: PostService, private route: ActivatedRoute){}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      const username = params.get("username")
      if(username) {
        this.loadUserPosts(username)
      }
    });
    const user = JSON.parse(localStorage.getItem("profile")!)
    this.loggedUserId = user.user_id
    
  }

  loadUserPosts(username: any) {

    this.postService.getPostsByUsername(username).subscribe((res: any) => {
      this.userPosts = res
    })
  }

  onPostDeleted(postId: number) {
    this.userPosts = this.userPosts.filter(p => p.id !== postId);
  }

}
