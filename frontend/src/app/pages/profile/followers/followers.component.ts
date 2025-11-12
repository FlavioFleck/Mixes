import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { RightbarComponent } from '../../../components/rightbar/rightbar.component';

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, RightbarComponent],
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent {

}