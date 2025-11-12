import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { FeedComponent } from './pages/feed/feed.component';
import { ProfileOverviewComponent } from './pages/profile/overview/overview.component';
import { FollowersComponent } from './pages/profile/followers/followers.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: FeedComponent }, // Feed é a home
      { path: 'feed', component: FeedComponent },
      { path: 'profile', redirectTo: 'profile/overview', pathMatch: 'full' },
      { path: 'profile/overview', component: ProfileOverviewComponent },
      { path: 'profile/followers', component: FollowersComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
