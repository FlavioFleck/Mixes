import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { CreateProfile } from './pages/auth/create-profile/create-profile';
import { Layout } from './layout/layout';
import { Feed } from './pages/feed/feed';
import { Profile } from './pages/profile/profile';
import { Overview } from './pages/profile/overview/overview';
import { Posts } from './pages/profile/posts/posts';
import { Followers } from './pages/profile/followers/followers';
import { LandingPage } from './pages/landing-page/landing-page';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Auth
  { path: 'auth/login', component: Login },
  { path: 'auth/register', component: Register },
  { path: 'auth/profile', component: CreateProfile },

  // Página Welcome 
  { path: 'welcome', component: LandingPage },

  // Rotas protegidas (só entra logado)
  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],  
    children: [
      { path: '', component: Feed },

      {
        path: 'profile/:username',
        component: Profile,
        children: [
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          { path: 'overview', component: Overview },
          { path: 'posts', component: Posts },
          { path: 'followers', component: Followers }
        ]
      }
    ]
  },

  { path: '**', redirectTo: 'welcome' }
];
