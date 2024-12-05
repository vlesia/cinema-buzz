import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  {
    path: 'movie/:id',
    loadChildren: () =>
      import('./pages/movie-details/movie-details.module').then(
        (m) => m.MovieDetailsModule
      ),
    title: 'Movie',
  },
  {
    path: 'favorite',
    loadChildren: () =>
      import('./pages/favorite-list/favorite.module').then(
        (m) => m.FavoriteModule
      ),
    title: 'My favorite',
  },

  { path: '**', redirectTo: '' },
];
