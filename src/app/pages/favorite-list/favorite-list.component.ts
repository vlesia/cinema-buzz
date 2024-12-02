import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../models/movie.model';
import { StorageService } from '../../services/storage.service';
import { MoviesContextService } from '../../services/movies-context.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.scss',
})
export class FavoriteListComponent implements OnInit {
  movies: Movie[] = [];

  private router = inject(Router);
  private storageService = inject(StorageService);
  private moviesContext = inject(MoviesContextService);

  ngOnInit(): void {
    this.loadMovies();
    this.moviesContext.setContext('favorite');
  }

  removeMovie(movie: Movie): void {
    this.storageService.removeMovie(movie.id);

    this.loadMovies();
  }
  loadMovies(): void {
    this.movies = this.storageService.getMovies();
  }
  navigateToMovieDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}
