import { Component, DestroyRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie.model';
import { MoviesContextService } from '../../services/movies-context.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  isFetching = false;
  error = '';
  page: number = 1;
  totalItems: number = 1160;

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private destroyRef: DestroyRef,
    private moviesContext: MoviesContextService
  ) {}

  ngOnInit(): void {
    this.page = this.moviesContext.getPage();
    this.fetchMovies(this.page);
    this.moviesContext.setContext('home');
  }

  fetchMovies(page: number): void {
    this.isFetching = true;
    const subscription = this.moviesService
      .getMovies(page)
      .pipe(
        finalize(() => {
          this.isFetching = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.movies = data;
        },
        error: (err: Error) => (this.error = err.message),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  pageChanged(page: number): void {
    this.movies = [];
    this.page = page;
    this.moviesContext.setPage(page);
    this.fetchMovies(page);
  }

  navigateToMovieDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}
