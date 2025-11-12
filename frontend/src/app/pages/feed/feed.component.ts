import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // p/ *ngFor
import { PostComponent } from '../../components/post/post.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule, 
    PostComponent
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {

  // mockada //o *ngFor vai criar 3 <app-post> por causa desses 3 itens. (no futuro, serviço de api)
  posts = [
    { id: 1, user: 'post1' },
    { id: 2, user: 'post2' },
    { id: 3, user: 'post3' }
  ];

}