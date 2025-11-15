import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Feed } from './pages/feed/feed';
import { Profile } from './pages/profile/profile';
import { Overview } from './pages/profile/overview/overview';
import { Posts } from './pages/profile/posts/posts';
import { Followers } from './pages/profile/followers/followers';

export const routes: Routes = [
  
  // rota "pai"
  { path: '', component: Layout, children: [
      
      // rota principal "localhost:4200/", carrega o feed
      { path: '', component: Feed }, 
      
      // rota perfil "localhost:4200/profile"
      { path: 'profile', component: Profile,
        children: [
          // redirecionamento para "overview"
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          { path: 'overview', component: Overview },
          { path: 'posts', component: Posts },
          { path: 'followers', component: Followers },
        ]
      }
      
      // outras paginas...
    ]
  }
];