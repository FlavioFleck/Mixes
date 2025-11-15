import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // para carregar as páginas
import { Header } from '../components/header/header';
import { Sidebar } from '../components/sidebar/sidebar';
import { Rightbar } from '../components/rightbar/rightbar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Sidebar, Rightbar],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  
}