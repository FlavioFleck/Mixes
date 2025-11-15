import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Rightbar } from '../../components/rightbar/rightbar';
import { Post } from '../../components/post/post';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, Header, Sidebar, Rightbar, Post],
  templateUrl: './feed.html',
  styleUrl: './feed.css'
})
export class Feed {
  // add lógica, como buscar posts de uma api
}