import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie.model';
import { StorageService } from '../../services/storage.service';
import { MoviesContextService } from '../../services/movies-context.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movieId!: number;
  movie?: Movie;
  error = '';
  isFetching = false;
  movies: Movie[] = [];
  moviesFavorite: Movie[] = [];
  context = '';

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private moviesService = inject(MoviesService);
  private storageService = inject(StorageService);
  private moviesContext = inject(MoviesContextService);

  get posterUrl(): string {
    return `https://image.tmdb.org/t/p/w342${this.movie?.poster_path}`;
  }

  get backgroundUrl(): string {
    return this.movie?.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${this.movie.backdrop_path}`
      : '';
  }

  ngOnInit(): void {
    this.initializeContext();
    this.movieId = +this.activatedRoute.snapshot.params['id'];
    this.fetchMovie(this.movieId);
  }

  get isLastMovie(): boolean {
    return this.movies[this.movies.length - 1]?.id === this.movie?.id;
  }

  get isFirstMovie(): boolean {
    return this.movies[0]?.id === this.movie?.id;
  }

  get isMovieInFavorite(): boolean {
    return this.moviesFavorite.some((movie) => movie.id === this.movie?.id);
  }

  get showNextButton(): boolean {
    return this.movies.length > 1;
  }

  get showBackButton(): boolean {
    return this.movies.length < 1 || this.isFirstMovie;
  }

  getNextMovie(): void {
    if (this.isLastMovie) {
      this.redirectToContext();
      return;
    }

    const nextMovieId = this.getRelativeMovieId(1);
    if (nextMovieId) {
      this.router.navigate(['/movie', nextMovieId]);
      this.fetchMovie(nextMovieId);
    }
  }

  getPreviousMovie(): void {
    if (this.movies.length === 0 || this.isFirstMovie) {
      this.redirectToContext();
      return;
    }

    const previousMovieId = this.getRelativeMovieId(-1);
    if (previousMovieId) {
      this.router.navigate(['/movie', previousMovieId]);
      this.fetchMovie(previousMovieId);
    }
  }

  addToFavorite(): void {
    if (this.movie) this.storageService.addOrRemoveMovie(this.movie);
    this.moviesFavorite = this.storageService.getMovies();
  }

  private getRelativeMovieId(offset: number): number | null {
    const currentIndex = this.movies.findIndex(
      (movie) => movie.id === this.movie?.id
    );

    const newIndex = currentIndex + offset;
    if (newIndex >= 0 && newIndex < this.movies.length) {
      return this.movies[newIndex].id;
    }
    return null;
  }

  private initializeContext(): void {
    this.moviesFavorite = this.storageService.getMovies();
    this.context = this.moviesContext.getContext();

    this.movies =
      this.context === 'home' ? this.moviesService.movies : this.moviesFavorite;
  }

  private fetchMovie(movieId: number): void {
    this.isFetching = true;
    const subscription = this.moviesService
      .getMovieById(movieId)
      .pipe(
        finalize(() => {
          this.isFetching = false;
        })
      )
      .subscribe({
        next: (movie) => {
          this.movie = movie;
        },
        error: (err: Error) => {
          this.error = err.message;
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private redirectToContext(): void {
    const route = this.context === 'home' ? '' : 'favorite';
    this.router.navigate([route]);
  }
}
